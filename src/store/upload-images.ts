import create from 'zustand'
import {persist} from 'zustand/middleware'

interface StateImage {
  file: File
  url: string
}

type State = {
  images: StateImage[]
  addImages: (files: File[]) => void
  deleteImage: (url: string) => void
  clearState: () => void
}

type InitialState = {
  images: StateImage[]
}

const initialState: InitialState = {
  images: [],
}

export const useUploadDesignImagesStore = create<State>(
  persist(
    (set, get) => ({
      ...initialState,
      /**
       * Add image files to the state. A DOM url will be generated for each file
       * in order to be shown in the preview
       * @param files An array of files, typically obtained from a file input
       */
      addImages: files => {
        const {images} = get()
        const newImages = files.map(file => ({
          file,
          url: URL.createObjectURL(file),
        }))
        set({images: [...images, ...newImages]})
      },

      /**
       * Delete an image from the state, and clear the DOM url generated for that image
       * @param url The DOM url generated for that image
       * @returns
       */
      deleteImage: url => {
        const {images} = get()
        const image = images.find(img => img.url === url)
        if (!image) {
          return
        }

        // Tell browser to not keep the reference to that file any longer
        URL.revokeObjectURL(url)

        set({images: images.filter(image => image.url !== url)})
      },
      clearState: () => {
        const images = get().images
        for (let i = 0; i < images.length; ++i) {
          URL.revokeObjectURL(images[i].url)
        }
        set({...initialState})
        window.localStorage.removeItem('design-images')
      },
    }),
    {
      name: 'design-images', // persist store to local storage
    },
  ),
)
