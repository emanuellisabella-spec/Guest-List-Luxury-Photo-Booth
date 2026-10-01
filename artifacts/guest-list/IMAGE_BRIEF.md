# Guest List – replacement image brief

Goal: six distinct photos (today 4 files are reused across 6 gallery slots) that show
**a real iPad photo booth rental at real Atlanta events**, with a diverse guest mix.

## What's wrong with the current set

| File | Issue |
|---|---|
| `guest-list-hero.jpg` | Booth is a blank black tablet on a pole, no screen UI, no ring light, no branding. Single couple, one demographic. |
| `guest-list-gallery-1.jpg` | Booth is a gold-backed panel with no visible screen; guests aren't using it. |
| `guest-list-gallery-2.jpg` | Not a booth, just a selfie group. |
| `guest-list-gallery-3.jpg` | Booth is a bespoke leather kiosk with a tiny screen, not an iPad on a stand. Reads as a different product. |
| All | Cast is uniformly Black, uniformly ~25-40, all black-tie. Site also serves Spanish/quinceañera audiences. |

## Accuracy rules for every image

- Booth = large iPad (portrait or landscape) in a slim stand/enclosure with a **visible ring light** and a
  **lit screen showing a camera preview or a countdown**, not a dark/blank screen.
- Show the interaction: guests in frame on screen, a finger tapping start, a countdown, or a printed/digital
  strip being shared (QR / text-to-phone).
- Add a simple backdrop (sequin wall, floral wall, drape) where it fits.
- Shot on phone-realistic lighting: warm venue light, no plastic skin, correct hands.

## Shot list (maps to gallery slots)

1. **Wedding reception** – couple + wedding party at the booth, screen showing live preview. (Diverse: e.g. Latina bride, white groom, mixed party.)
2. **Quinceañera** – quinceañera in gown with court/family, ring light visible, Spanish-speaking family feel. (Replaces ES lead-magnet context.)
3. **Corporate / gala** – coworkers in cocktail attire, mixed ages, tapping the iPad.
4. **Close-up of the booth** – iPad in stand with ring light, screen showing "Tap to start" / countdown, styled table with florals.
5. **Sweet 16 / birthday** – younger group, balloons or neon, fun poses with props.
6. **Sharing moment** – guests looking at the result on screen / phone, QR or text-share visible.

Hero: use #1 or a wide version of #4 with guests, in landscape-friendly crop (focal point ~63% from left).

## Diversity guidance

Mix of ages (teens → 60s), skin tones, body types, a couple with a hijab / a Black family / a
Latino family / an Asian friend group / an older couple. Avoid one demographic dominating the set.

## Prompt template (for image generation)

> Candid event photograph, [EVENT TYPE] in Atlanta, [N] [DESCRIBE GUESTS] gathered around a white
> iPad photo booth on a slim stand with a round ring light, the iPad screen lit showing a live camera
> preview with a 3-2-1 countdown, [BACKDROP], warm ambient venue lighting, shallow depth of field,
> 35mm lens, natural skin texture, realistic hands, no text artifacts, no logos.

Export: JPG, 1600px on the long edge, ≤200 KB, named `guest-list-gallery-1..6.jpg` and `guest-list-hero.jpg`.
Then update `src/App.tsx` (gallery grid, ~lines 571-576) so each slot points at a unique file, and update the
`gallery.alt1-6` strings (EN and ES) to describe what each new photo shows.
