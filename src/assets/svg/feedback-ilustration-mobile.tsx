import * as React from 'react'

import {useColorModeValue, useTheme} from '@chakra-ui/system'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  const {colors} = useTheme() as any
  const surface = useColorModeValue(colors.surface, colors.gray[700])
  const bg = useColorModeValue('white', colors.gray[900])
  const textInfoColor = useColorModeValue(
    colors.textSecondary,
    colors.gray[400],
  )
  const textColor = useColorModeValue('#333333', colors.gray[100])
  const rectangle = useColorModeValue('white', colors.gray[600])

  return (
    <svg
      width={300}
      height={253}
      viewBox="0 0 300 253"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Tags ilustration">
        <rect
          id="Rectangle 12"
          width={200}
          height={200.885}
          fill={surface ?? '#EEF3F4'}
        />
        <path
          id="Ellipse 19"
          d="M38.938 28.7611C38.938 32.1823 36.1645 34.9558 32.7433 34.9558C29.322 34.9558 26.5486 32.1823 26.5486 28.7611C26.5486 25.3398 29.322 22.5664 32.7433 22.5664C36.1645 22.5664 38.938 25.3398 38.938 28.7611Z"
          fill="#F07320"
        />
        <text
          id="signup feedback"
          fill={textColor ?? '#212528'}
          xmlSpace="preserve"
          style={{
            whiteSpace: 'pre',
          }}
          fontFamily="IBM Plex Serif"
          fontSize={14}
          letterSpacing="0em"
        >
          <tspan x={46} y={33.25}>
            signup feedback
          </tspan>
        </text>
        <text
          id="Feedback"
          fill={textColor ?? '#686868'}
          xmlSpace="preserve"
          style={{
            whiteSpace: 'pre',
          }}
          fontFamily="Lato"
          fontSize={12}
          letterSpacing="0em"
        >
          <tspan x={29.2036} y={54.644}>
            Feedback
          </tspan>
        </text>
        <g id="Text placeholder">
          <g id="Rectangle 14" filter="url(#filter0_d)">
            <rect
              x={29.2036}
              y={91.5929}
              width={135.841}
              height={17.6991}
              fill={rectangle ?? '#FCFDFD'}
            />
          </g>
          <rect
            id="Rectangle 15"
            x={31.8584}
            y={95.1328}
            width={124.779}
            height={3.53982}
            fill={surface ?? '#EEF3F4'}
          />
          <rect
            id="Rectangle 16"
            x={31.8584}
            y={100.442}
            width={56.1947}
            height={3.53982}
            fill={surface ?? '#EEF3F4'}
          />
        </g>
        <g id="Text placeholder_2">
          <g id="Rectangle 14_2" filter="url(#filter1_d)">
            <rect
              x={29.2036}
              y={118.142}
              width={135.841}
              height={17.6991}
              fill={rectangle ?? '#FCFDFD'}
            />
          </g>
          <rect
            id="Rectangle 15_2"
            x={31.8584}
            y={121.681}
            width={124.779}
            height={3.53982}
            fill={surface ?? '#EEF3F4'}
          />
          <rect
            id="Rectangle 16_2"
            x={31.8584}
            y={126.991}
            width={56.1947}
            height={3.53982}
            fill={surface ?? '#EEF3F4'}
          />
        </g>
        <g id="Text placeholder_3">
          <g id="Rectangle 14_3" filter="url(#filter2_d)">
            <rect
              x={29.2036}
              y={144.69}
              width={135.841}
              height={17.6991}
              fill={rectangle ?? '#FCFDFD'}
            />
          </g>
          <rect
            id="Rectangle 15_3"
            x={31.8584}
            y={148.23}
            width={124.779}
            height={3.53982}
            fill={surface ?? '#EEF3F4'}
          />
          <rect
            id="Rectangle 16_3"
            x={31.8584}
            y={153.54}
            width={56.1947}
            height={3.53982}
            fill={surface ?? '#EEF3F4'}
          />
        </g>
        <g id="Text placeholder_4">
          <g id="Rectangle 14_4" filter="url(#filter3_d)">
            <rect
              x={29.2036}
              y={65.0443}
              width={135.841}
              height={17.6991}
              fill={rectangle ?? '#FCFDFD'}
            />
          </g>
          <rect
            id="Rectangle 15_4"
            x={31.8584}
            y={68.5841}
            width={124.779}
            height={3.53982}
            fill={surface ?? '#EEF3F4'}
          />
          <rect
            id="Rectangle 16_4"
            x={31.8584}
            y={73.8938}
            width={56.1947}
            height={3.53982}
            fill={surface ?? '#EEF3F4'}
          />
        </g>
        <rect
          id="Rectangle 13"
          x={100}
          y={51.7699}
          width={200}
          height={200.885}
          fill={bg ?? '#FCFDFD'}
        />
        <text
          id="Tags"
          fill={textColor ?? '#212528'}
          xmlSpace="preserve"
          style={{
            whiteSpace: 'pre',
          }}
          fontFamily="IBM Plex Serif"
          fontSize={16}
          letterSpacing="0em"
        >
          <tspan x={124.336} y={89.6283}>
            Tags
          </tspan>
        </text>
        <g id="tag line">
          <path
            id="Ellipse 20"
            d="M130.974 107.301C130.974 109.134 129.488 110.619 127.655 110.619C125.822 110.619 124.336 109.134 124.336 107.301C124.336 105.468 125.822 103.982 127.655 103.982C129.488 103.982 130.974 105.468 130.974 107.301Z"
            fill="#F07320"
          />
          <text
            id="signup"
            fill={textColor ?? '#333333'}
            xmlSpace="preserve"
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Lato"
            fontSize={10}
            letterSpacing="0.02em"
          >
            <tspan x={137.611} y={110.507}>
              signup
            </tspan>
          </text>
          <line
            id="Line 3"
            x1={124.338}
            y1={115.237}
            x2={288.497}
            y2={116.094}
            stroke={surface ?? '#EEF3F4'}
            strokeWidth={0.5}
          />
          <text
            id="20"
            fill={textInfoColor ?? '#747474'}
            xmlSpace="preserve"
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Lato"
            fontSize={12}
            letterSpacing="0.02em"
          >
            <tspan x={267} y={113.644}>
              20
            </tspan>
          </text>
        </g>
        <g id="tag line_2">
          <path
            id="Ellipse 20_2"
            d="M130.973 129.867C130.973 131.7 129.488 133.186 127.655 133.186C125.822 133.186 124.336 131.7 124.336 129.867C124.336 128.035 125.822 126.549 127.655 126.549C129.488 126.549 130.973 128.035 130.973 129.867Z"
            fill="#1B4962"
          />
          <text
            id="recommandations"
            fill={textColor ?? '#333333'}
            xmlSpace="preserve"
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Lato"
            fontSize={10}
            letterSpacing="0.02em"
          >
            <tspan x={138} y={132.87}>
              recommandations
            </tspan>
          </text>
          <line
            id="Line 3_2"
            x1={124.337}
            y1={137.803}
            x2={288.497}
            y2={138.66}
            stroke={surface ?? '#EEF3F4'}
            strokeWidth={0.5}
          />
          <text
            id="15"
            fill={textInfoColor ?? '#747474'}
            xmlSpace="preserve"
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Lato"
            fontSize={12}
            letterSpacing="0.02em"
          >
            <tspan x={267} y={136.144}>
              15
            </tspan>
          </text>
        </g>
        <g id="tag line_3">
          <path
            id="Ellipse 20_3"
            d="M130.974 152.434C130.974 154.266 129.488 155.752 127.655 155.752C125.822 155.752 124.336 154.266 124.336 152.434C124.336 150.601 125.822 149.115 127.655 149.115C129.488 149.115 130.974 150.601 130.974 152.434Z"
            fill="#9F57AE"
          />
          <text
            id="onboarding"
            fill={textColor ?? '#333333'}
            xmlSpace="preserve"
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Lato"
            fontSize={10}
            letterSpacing="0.02em"
          >
            <tspan x={137.611} y={155.64}>
              onboarding
            </tspan>
          </text>
          <line
            id="Line 3_3"
            x1={124.338}
            y1={160.369}
            x2={288.497}
            y2={161.227}
            stroke={surface ?? '#EEF3F4'}
            strokeWidth={0.5}
          />
          <text
            id="34"
            fill={textInfoColor ?? '#747474'}
            xmlSpace="preserve"
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Lato"
            fontSize={12}
            letterSpacing="0.02em"
          >
            <tspan x={267} y={159.144}>
              34
            </tspan>
          </text>
        </g>
        <g id="tag line_4">
          <path
            id="Ellipse 20_4"
            d="M130.974 175C130.974 176.833 129.488 178.319 127.655 178.319C125.822 178.319 124.336 176.833 124.336 175C124.336 173.167 125.822 171.681 127.655 171.681C129.488 171.681 130.974 173.167 130.974 175Z"
            fill="#F3CE9A"
          />
          <line
            id="Line 3_4"
            x1={124.338}
            y1={182.936}
            x2={288.497}
            y2={183.793}
            stroke={surface ?? '#EEF3F4'}
            strokeWidth={0.5}
          />
          <text
            id="27"
            fill={textInfoColor ?? '#747474'}
            xmlSpace="preserve"
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Lato"
            fontSize={12}
            letterSpacing="0.02em"
          >
            <tspan x={267} y={181.144}>
              27
            </tspan>
          </text>
          <text
            id="new feed"
            fill={textColor ?? '#333333'}
            xmlSpace="preserve"
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Lato"
            fontSize={10}
            letterSpacing="0.02em"
          >
            <tspan x={137.611} y={178.206}>
              new feed
            </tspan>
          </text>
        </g>
        <g id="tag line_5">
          <path
            id="Ellipse 20_5"
            d="M130.974 197.566C130.974 199.399 129.488 200.885 127.655 200.885C125.822 200.885 124.336 199.399 124.336 197.566C124.336 195.734 125.822 194.248 127.655 194.248C129.488 194.248 130.974 195.734 130.974 197.566Z"
            fill="#192261"
          />
          <text
            id="logo variation"
            fill={textColor ?? '#333333'}
            xmlSpace="preserve"
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Lato"
            fontSize={10}
            letterSpacing="0.02em"
          >
            <tspan x={137.611} y={200.773}>
              logo variation
            </tspan>
          </text>
          <line
            id="Line 3_5"
            x1={124.338}
            y1={205.502}
            x2={288.497}
            y2={206.359}
            stroke={surface ?? '#EEF3F4'}
            strokeWidth={0.5}
          />
          <text
            id="15_2"
            fill={textInfoColor ?? '#747474'}
            xmlSpace="preserve"
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Lato"
            fontSize={12}
            letterSpacing="0.02em"
          >
            <tspan x={267} y={204.144}>
              15
            </tspan>
          </text>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d"
          x={19.7036}
          y={82.0929}
          width={155.841}
          height={37.6991}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={0.5} dy={0.5} />
          <feGaussianBlur stdDeviation={5} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d"
          x={19.7036}
          y={108.642}
          width={155.841}
          height={37.6991}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={0.5} dy={0.5} />
          <feGaussianBlur stdDeviation={5} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d"
          x={19.7036}
          y={135.19}
          width={155.841}
          height={37.6991}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={0.5} dy={0.5} />
          <feGaussianBlur stdDeviation={5} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d"
          x={19.7036}
          y={55.5443}
          width={155.841}
          height={37.6991}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={0.5} dy={0.5} />
          <feGaussianBlur stdDeviation={5} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export const FeedbackIlustrationMobile = React.memo(SvgComponent)
