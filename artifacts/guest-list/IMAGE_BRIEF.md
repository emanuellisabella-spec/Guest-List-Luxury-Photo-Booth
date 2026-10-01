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

## Our actual booth (use this in every prompt)

Tall **all-white** pedestal photo booth: round white base, slim white column, oval white enclosure
with an iPad centered in it and a **white LED ring light** around the iPad. Roughly 6 ft tall, freestanding.
**No backdrop.** Photos are of guests using the booth in a real venue.

## Guest mix

Mostly Hispanic/Latino and white guests, a few others for realism. Mixed ages.

## Shot list (maps to gallery slots; hero = #1)

1. **Wedding** - bride and groom (Latina bride, white groom) laughing at the booth, wedding party behind. Hero.
2. **Quinceanera** - quinceanera in a gown with her court / family, Latino family at the booth.
3. **Corporate event** - coworkers (white and Hispanic) in business-casual or cocktail attire, one tapping the iPad.
4. **Booth close-up** - white booth in a venue, iPad screen showing a countdown, ring light on, one guest partially in frame.
5. **Birthday / sweet 16** - friends (Hispanic and white) crowding the booth, playful poses.
6. **Sharing moment** - guests checking their photo on the screen / phone, laughing.

## Prompt template

> Candid event photograph at [VENUE: elegant ballroom / banquet hall / upscale office event], [GUESTS], using a
> tall all-white pedestal photo booth with a round white base, slim white column, and an oval white enclosure
> holding an iPad framed by a glowing white LED ring light. The iPad screen is lit, showing a live camera
> preview with a countdown. No backdrop, real venue visible and softly blurred behind. Warm ambient light,
> 35mm lens, shallow depth of field, natural skin texture, realistic hands, no text or logos.

Tip: attach your Amazon product photo (or a photo of your own unit) as a reference image if the tool allows it,
so the booth shape stays consistent across all six images.

Export: JPG, 1600px long edge, 200 KB or smaller, named `guest-list-hero.jpg` and `guest-list-gallery-1..6.jpg`.
Then update `src/App.tsx` (gallery grid, ~lines 571-576) so each slot uses a unique file, and update `gallery.alt1-6` (EN + ES).
