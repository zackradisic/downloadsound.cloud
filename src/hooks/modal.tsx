import React, { useState } from 'react'
import _Modal from 'react-bulma-components/lib/components/modal'
import Section from 'react-bulma-components/lib/components/section'

// eslint-disable-next-line no-undef
const useModal = (): [() => JSX.Element, () => void] => {
  const [show, setShow] = useState(false)

  const open = () => setShow(true)
  const close = () => setShow(false)

  const modal = () => {
    return (
      <_Modal
        show={show}
        onClose={close}
        showClose={true}
        closeOnEsc={true}
        closeOnBlur={true}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Share</p>
            <button
              className="delete"
              aria-label="close"
              onClick={close}></button>
          </header>
          <section className="modal-card-body"></section>
          <footer className="modal-card-foot"></footer>
        </div>
      </_Modal>
    )
  }

  return [modal, open]
}

export default useModal
