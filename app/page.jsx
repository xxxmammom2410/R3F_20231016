'use client'

import dynamic from 'next/dynamic'
import { Box, Environment, Plane } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import { useControls } from 'leva'

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const Bon = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Bon), { ssr: false })
const BonFloor = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.BonFloor), { ssr: false })
const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  const color = useControls({
    value: '#ffe0b7',
  })
  const { position } = useControls({
    position: {
      value: { x: 1.37, y: 3.0, z: 0.23 },
      step: 0.01,
    },
  })
  const { rotation } = useControls({
    rotation: {
      value: { x: -Math.PI / 2, y: 0, z: 0 },
      step: 0.1,
    },
  })
  const { decay } = useControls({
    decay: {
      value: 9.4,
      step: 0.1,
    },
  })
  const { distance } = useControls({
    distance: {
      value: 12.4,
      step: 0.1,
    },
  })

  const { power } = useControls({
    power: {
      value: 2000,
      step: 1,
    },
  })

  const ref_pointLight = useRef()

  useEffect(() => {
    setInterval(() => {
      ref_pointLight.current.distance = 12 + Math.random()
    }, 100)
  })

  return (
    <>
      <div className='mx-auto flex h-full w-full flex-col flex-wrap items-center bg-black p-12'>
        <div className='relative my-12 h-full w-full py-6 '>
          <View
            orbit
            className='relative h-full  '
            onClick={() => {
              console.log('hoge')
            }}
          >
            <Suspense fallback={null}>
              <Bon scale={8} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
              <BonFloor scale={8} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
              {/* <pointLight position={position} intensity={500} color='#f00' /> */}
              {/* <pointLight position={[2, 2, 2]} power={2000} decay={5} distance={5} /> */}
              <pointLight
                ref={ref_pointLight}
                //  2, y: 0.42, z: -1.22
                // position={[1, 0.42, -1.22]}
                position={[position.x, position.y, position.z]}
                power={power}
                // intensity={100}
                decay={decay}
                distance={distance}
                rotation={[rotation.x, rotation.y, rotation.z]}
                color={color.value}
                castShadow
              />
              <directionalLight castShadow intensity={1} />
              {/* <Box castShadow position={[position.x, position.y, position.z]} receiveShadow /> */}
              {/* <mesh castShadow position={[position.x, position.y, position.z]}>
                <boxGeometry />
                <meshStandardMaterial />
              </mesh> */}
              <mesh receiveShadow scale={4} position={[0, -2, 0]} rotation={[rotation.x, rotation.y, rotation.z]}>
                <planeGeometry />
                <meshStandardMaterial />
              </mesh>
              {/* <Plane
                position={[0, -1, 0]}
                scale={4}
                rotation={[rotation.x, rotation.y, rotation.z]}
                castShadow
                receiveShadow
              /> */}
              <ambientLight intensity={0.01} />
              {/* <Common color={'lightpink'} /> */}
              {/* <Common color={color.value} /> */}
              {/* <Environment files='./img/MR_INT-001_NaturalStudio_NAD.hdr' /> */}
            </Suspense>
          </View>
        </div>
      </div>
    </>
  )
}
