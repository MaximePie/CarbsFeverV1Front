import { store } from 'react-notifications-component';

const baseNotification = {
  insert: "top",
  container: "top-right",
  animationIn: ["animate__animated", "animate__fadeIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 2500,
    onScreen: true,
    pauseOnHover: true,
  },
  touchSlidingExit: {
    swipe: {
      duration: 250,
      timingFunction: 'ease-out',
      delay: 0,
    },
    fade: {
      duration: 250,
      timingFunction: 'ease-out',
      delay: 0
    }
  }
}

// TYPES :
// success
// danger
// info
// default
// warning

export const systemErrorNotification = {
  ...baseNotification,
  title: "Aïe !",
  message: "Il y a eu une erreur, sûrement un problème de configuration de la part du serveur. Nous allons corriger tout ça.",
  type: "danger",
  dismiss: {
    duration: 7500,
    onScreen: true,
    pauseOnHover: true,
  },
};
