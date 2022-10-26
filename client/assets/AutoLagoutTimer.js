// import React from 'react'
// import { useIdleTimer } from 'react-idle-timer'
// import { useNavigate } from 'react-router'

// const SESSION_IDEL_MINUTES = 4;

// const AutoLagoutTimer = (props: any) => {
//     const { ComposedClass } = props
//     const navigate = useNavigate()

//     const handleOnIdle = (event: any) => {
//         // SHOW YOUR MODAL HERE AND LAGOUT
//         console.log('user is idle', event)
//         console.log('last active', getLastActiveTime())
//         navigate("/")
//     }

//     const {getLastActiveTime } = useIdleTimer({
//         timeout: 1000 * 60 * SESSION_IDEL_MINUTES,
//         onIdle: handleOnIdle,
//         debounce: 500,
//     })

//     return <ComposedClass />
// }

// export default AutoLagoutTimer;