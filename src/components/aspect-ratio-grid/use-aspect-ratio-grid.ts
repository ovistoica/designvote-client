import {useSafeLayoutEffect} from '@chakra-ui/react'
import {useState} from 'react'
import {useResizeObserver} from './use-resize-observer'
import {getFluidGridProps} from './get-fluid-props'
import {getStaticGridProps} from './get-static-grid-props'
import {useGridConstraints} from './use-grid-constraints'
interface UseAspectRatioGridProps {
  aspectRatio: number
  gap: number
  items: number
  minChildWidth: number
}

export const useAspectRatioGrid = (options: UseAspectRatioGridProps) => {
  const {aspectRatio, items, gap, minChildWidth} = options
  const minChildHeight = minChildWidth / aspectRatio
  const {ref, width, height} = useResizeObserver<HTMLDivElement>()
  const [gridProps, setGridProps] = useState({})

  const {maxColumns, maxItems} = useGridConstraints(
    width,
    height,
    minChildWidth,
    minChildHeight,
    gap,
  )

  useSafeLayoutEffect(() => {
    if (height && width && maxItems) {
      const gridProps =
        items > maxItems
          ? getFluidGridProps({items, width, aspectRatio, gap, maxColumns})
          : getStaticGridProps({
              items,
              width,
              aspectRatio,
              gap,
              maxColumns,
              height,
            })
      setGridProps(gridProps)
    }
  }, [aspectRatio, gap, height, items, maxColumns, maxItems, width])

  const defaultProps = {
    minWidth: minChildWidth,
    minHeight: minChildHeight,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    gap: `${gap}px`,
  }

  return {ref, aspectRatioGridProps: {...defaultProps, ...gridProps}}
}