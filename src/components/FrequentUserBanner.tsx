import React from 'react'
import Box from 'react-bulma-components/lib/components/box'
import Button from 'react-bulma-components/lib/components/button'
import { Link } from 'gatsby'
import {
  disableKey,
  getActiveUserData,
  setLocalStorageItem
} from '../lib/active-user'

interface Props {
  close: React.Dispatch<React.SetStateAction<boolean>>
}
const FrequentUserBanner = ({ close }: Props) => {
  const closeWrapper = () => {
    const { disables } = getActiveUserData()
    close(false)
    console.log(disableKey, JSON.stringify(disables + 1))
    setLocalStorageItem(disableKey, disables + 1)
  }
  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        zIndex: 1000
      }}>
      <Box
        style={{
          padding: '1rem'
        }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ flex: '1 1 0%' }}>
            Hey 👋! We notice you&apos;re an active user. We&apos;d love to chat
            with you and get feedback about the site!
          </h1>
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <Button color="primary" style={{ marginRight: '1rem' }}>
              <Link to="/contact" style={{ color: 'white' }}>
                Chat with us
              </Link>
            </Button>
            <a
              href="https://discord.gg/39bEkYuzrN"
              style={{
                marginRight: '1rem',
                paddingTop: '1px',
                width: '2.5rem',
                height: '2.5rem'
              }}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="discord"
                className="svg-inline--fa fa-discord fa-w-14 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
                style={{
                  color: '#FF3300'
                }}>
                <path
                  fill="currentColor"
                  d="M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z"></path>
              </svg>
            </a>
            <Button onClick={closeWrapper}>
              <svg
                style={{
                  color: '#4b4b4b',
                  width: '1rem',
                  height: '1.5rem'
                }}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
      </Box>
    </Box>
  )
}

export default FrequentUserBanner
