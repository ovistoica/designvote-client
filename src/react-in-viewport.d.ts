declare module 'react-in-viewport' {
  export type ViewportConfig = {
    disconnectOnLeave?: boolean
  }

  export function handleViewport<P>(
    block: ReactNode,
    options?: IntersectionObserver,
    config?: ViewportConfig,
  ): React.ComponentType<
    P & {
      onEnterViewport?: VoidFunction
      onLeaveViewport?: VoidFunction
    }
  >

  export type PropsInViewport = {
    inViewport: boolean
    enterCount: number
    leaveCount: number
    forwardedRef?: React.MutableRefObject
    onEnterViewport?: VoidFunction
    onLeaveViewport?: VoidFunction
  }

  export type UseInViewportReturnType = {
    inViewport: boolean
    enterCount: number
    leaveCount: number
  }

  export function useInViewport(
    ref: RefObject,
    options?: IntersectionObserver,
    config?: ViewportConfig,
    props: {
      onEnterViewport?: VoidFunction
      onLeaveViewport?: VoidFunction
    },
  ): UseInViewportReturnType

  export default handleViewport
}
