/* eslint-disable indent */
import React, { useMemo } from 'react'
import { DownloadTypes } from './downloader'
import Columns from 'react-bulma-components/lib/components/columns'
import useTheme from '../hooks/theme'

interface Props {
  activeTab: DownloadTypes
}

interface FAQQuestion {
  question: string
  answer: JSX.Element
}

const newQuestion = (question: string, answer: JSX.Element): FAQQuestion => ({
  question,
  answer
})

const getContent = (activeTab: DownloadTypes): FAQQuestion[] => {
  const questions: FAQQuestion[] = []
  switch (activeTab) {
    case DownloadTypes.Track:
      questions.push(
        newQuestion(
          "Why can't I download a track?",
          <p>
            You may not be able to download the track if its <b>copyrighted</b>,
            if its a <b>GO </b>track, or if its a <b>private track</b> and you
            don&apos;t have the private share link. Sorry! 🥺
          </p>
        ),
        newQuestion(
          'Can I download a private track?',
          <p>
            Yup 😁! As long as you have the secret <b>private share link</b> for
            the track, you should be able to download it with no problems
            whatsoever!
          </p>
        ),
        newQuestion(
          'Can I download GO tracks?',
          <p>
            Unfortunately we don&apos;t support downloading GO tracks at this
            moment 😔. Please <b>let us know</b> if this a feature you would
            like us to support in the future!
          </p>
        )
      )
      return questions
    case DownloadTypes.Likes:
      questions.push(
        newQuestion(
          "Why can't I download my likes?",
          <p>
            You might have trouble if you are downloading <b>too many likes</b>.
            This is because your browser has limited resources and may not be
            able to handle downloading a large amount of tracks.
            <br />
            <br />
            Please consider using our{' '}
            <a href="https://app.downloadsound.cloud">desktop app</a>, which
            allows you to download thousands of likes! 🥳
          </p>
        ),
        newQuestion(
          'Is there a limit to how many likes I can download?',
          <p>
            To save server costs, likes are limited to <b>~1000</b> downloads.
            If you would like to download your likes without restriction, try
            our <a href="https://app.downloadsound.cloud">desktop app</a>!
          </p>
        )
      )
      return questions
    case DownloadTypes.Playlist:
      questions.push(
        newQuestion(
          'Why am I having trouble downloading my playlist?',
          <p>
            Your <b>browser</b> may not be able to handle downloading a{' '}
            <b>large amount</b> of tracks 😅. Please consider using our{' '}
            <a href="https://app.downloadsound.cloud">desktop app</a>, which
            allows you to download thousands of your likes!
          </p>
        ),
        newQuestion(
          'Is there a playlist size download limit?',
          <p>
            We <b>don&apos;t impose</b> a limit on how big of a playlist you can
            download, you can download a playlist that is as big as the largest
            size SoundCloud allows (500 tracks). 🥳
          </p>
        )
      )
      return questions
  }
}

interface ItemProps {
  content: FAQQuestion
}

const FAQItem = ({ content: { question, answer } }: ItemProps) => {
  const theme = useTheme()
  return (
    <div style={{ marginTop: '2rem' }}>
      <h1
        style={{
          color: theme.containerTitle,
          fontWeight: 600,
          fontSize: '20px'
        }}>
        {question}
      </h1>
      <p>{answer}</p>
    </div>
  )
}

const FAQ = ({ activeTab }: Props) => {
  const theme = useTheme()
  const items = useMemo<JSX.Element[]>(
    () =>
      getContent(activeTab).map((content, idx) => (
        <FAQItem key={'faq-item-idx'} content={content} />
      )),
    [activeTab]
  )

  return (
    <div
      style={{
        color: theme.containerText,
        backgroundColor: theme.containerBackground,
        padding: '1.5rem 2.5rem',
        borderRadius: '10px',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }}>
      <h1
        style={{
          color: theme.containerTitle,
          fontSize: '24px',
          fontWeight: 600
        }}>
        Frequently Asked Questions
      </h1>
      {items}
    </div>
  )
}

export default FAQ
