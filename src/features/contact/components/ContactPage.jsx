import { useState } from 'react'
import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import { H1, Body, BodySm, Meta, Caption } from '../../../components/typography/Type'
import Button from '../../../components/ui/Button'
import Icon from '../../../components/ui/Icon'
import Reveal from '../../../components/animation/Reveal'
import '../contact.css'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', topic: 'A question', message: '' })
  useDocumentMeta('Contact — Papier', 'Write to the Papier studio.')

  function onSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="container">
      <div className="contact-layout">
        <Reveal>
          <div>
            <Meta style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>Write to us</Meta>
            <H1 as="h1">Say <em>hello.</em></H1>
            <Body style={{ color: 'var(--muted)', maxWidth: '40ch', marginTop: 'var(--space-lg)' }}>
              Questions, commissions, press, or just to tell us which wallpaper
              lives on your desktop — we read everything.
            </Body>
            <div className="contact-meta">
              <div>
                <Caption style={{ color: 'var(--faint)' }}>Email</Caption>
                <BodySm>studio@papier.example</BodySm>
              </div>
              <div>
                <Caption style={{ color: 'var(--faint)' }}>Studio hours</Caption>
                <BodySm>Mon–Fri, 9–18 CET</BodySm>
              </div>
              <div>
                <Caption style={{ color: 'var(--faint)' }}>Response time</Caption>
                <BodySm>Within two days</BodySm>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {sent ? (
            <div className="contact-sent">
              <span className="success-check"><Icon name="check" size={26} /></span>
              <h2 className="t-h2">Message <em className="t-italic">received.</em></h2>
              <Body style={{ color: 'var(--muted)' }}>
                Thank you, {form.name.split(' ')[0] || 'friend'}. We’ll reply within two days.
              </Body>
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit}>
              <div className="field-row">
                <label className="field">
                  <Caption>Name</Caption>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" autoComplete="name" />
                </label>
                <label className="field">
                  <Caption>Email</Caption>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" autoComplete="email" />
                </label>
              </div>
              <label className="field">
                <Caption>Topic</Caption>
                <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                  <option>A question</option>
                  <option>A commission</option>
                  <option>Press</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="field">
                <Caption>Message</Caption>
                <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us everything…" />
              </label>
              <Button type="submit" variant="primary" size="lg">
                Send message <Icon name="arrowRight" size={18} />
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  )
}
