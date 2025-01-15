import { useAuthStore } from '@/stores/auth.store'
import AnnotationInput from './annotation-input'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useEffect, useMemo, useState } from 'react'
import postApi, { IAnnotationData } from '@/apis/post.api'
import { countryList } from '@/assets/country-list'
import { Loader2 } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useParams } from 'react-router-dom'

const foodCategories = [
  { value: 'Homemade food or snacks', label: 'Homemade food or snacks' },
  { value: 'Dine-out meals', label: 'Dine-out meals' },
  { value: 'Packaged food', label: 'Packaged food' }
]

export default function AnnotationForm(props: { handleSubmit: (data: IAnnotationData) => Promise<void> }) {
  const { handleSubmit } = props
  const [loading, setLoading] = useState(false)
  const { setVisible } = useWalletModal()
  const { token } = useAuthStore()
  const { publicKey } = useWallet()
  const params = useParams()
  const [canAnnotate, setCanAnnotate] = useState(false)
  const [annotationData, setAnnotationData] = useState<IAnnotationData>({
    content: '',
    images: [],
    category: '',
    brand: '',
    region: ''
  })

  useEffect(() => {
    if (!token || !publicKey || !params.id) return
    postApi.checkAnnotation({ user_id: publicKey.toString(), code: params.id || '' }).then((res) => {
      if (res.data.can_annotation === 1) setCanAnnotate(true)
      else setCanAnnotate(false)
    })
  }, [token, publicKey, params.id])

  const canSubmit = useMemo(() => {
    return !!annotationData.category && !!annotationData.region
  }, [annotationData.category, annotationData.region])

  async function handleSubmitClick() {
    setLoading(true)
    await handleSubmit(annotationData)
    setLoading(false)
  }

  const handleInputChange = (field: keyof IAnnotationData, value: string) => {
    setAnnotationData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAnnotationInputChange = (value: IAnnotationData) => {
    setAnnotationData((prev) => ({
      ...prev,
      content: value.content,
      images: value.images
    }))
  }

  return (
    <div className="rounded-2xl bg-white/10 p-6">
      {token ? (
        <>
          {canAnnotate ? (
            <>
              <h2 className="mb-4 text-2xl font-bold">Submit valid data annotation descriptions to earn rewards.</h2>
              <p className="mb-8 text-gray-400">Random or fake entries will not be rewarded.</p>
              <div className="space-y-6">
                {/* Food Category */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Food Category <span className="text-[#ff0000]">*</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {foodCategories.map((category) => (
                      <label
                        key={category.value}
                        className={`flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-center transition-all ${
                          annotationData.category === category.value ? 'bg-primary text-black' : 'bg-white/5'
                        }`}
                      >
                        <input
                          type="radio"
                          name="foodCategory"
                          value={category.value}
                          checked={annotationData.category === category.value}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="hidden"
                        />
                        {category.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="mb-2 block text-sm font-medium">Brand</label>
                  <input
                    type="text"
                    value={annotationData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="w-full rounded-lg bg-white/5 px-4 py-2 text-white focus-within:outline focus-within:outline-1 focus-within:outline-primary"
                    placeholder="Enter brand name (optional)"
                  />
                </div>

                {/* Region */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Region <span className="text-[red]">*</span>
                  </label>
                  <div className="w-full rounded-lg bg-white/5 px-4 py-2 text-white focus-within:outline focus-within:outline-1 focus-within:outline-primary">
                    <select
                      value={annotationData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      className="w-full bg-black/0 text-white focus:outline-none [&>option]:bg-black [&>option]:text-white"
                      required
                    >
                      <option value="">Select a region</option>
                      {countryList.map((country) => (
                        <option key={country.value} value={country.label}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <AnnotationInput
                    value={annotationData}
                    onChange={handleAnnotationInputChange}
                    placeholder={`Please enter the data annotation description

Example 1 (Food identification): Not a donut! It's a Chick-fil-A chicken sandwich! About 115g, 420 calories, 18g fat, 41g carbs, and 29g protein. Source: https://www.chick-fil-a.com/catering/chick-fil-a-chicken-sandwich

Example 2 (Numerical count): Not 3 hotdogs but 4 hotdogs in the picture`}
                  />
                </div>
              </div>
              <button
                disabled={!canSubmit || loading}
                onClick={handleSubmitClick}
                className="mt-6 w-full rounded-lg bg-primary px-6 py-3 text-center text-black transition-all hover:bg-primary/90 disabled:opacity-25 md:min-w-32"
              >
                {loading ? <Loader2 className="mx-auto animate-spin"></Loader2> : 'Submit'}
              </button>
            </>
          ) : (
            <div>
              <h3 className="mb-4 text-lg font-bold">You can't submit data annotation now.</h3>
              <p>1. You have already submitted an annotation for this record, or</p>
              <p>2. Annotation limit reached. Please select other images to annotate</p>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="mb-4 text-2xl font-bold">Submit valid data annotation descriptions to earn rewards.</h2>
          <p className="mb-8 text-gray-400">Random or fake entries will not be rewarded.</p>

          <button
            onClick={() => setVisible(true)}
            className="w-full rounded-full bg-primary px-6 py-3 text-center text-black transition-all hover:bg-primary/90"
          >
            Feedback
          </button>
        </>
      )}
    </div>
  )
}
