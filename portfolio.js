/* ---------- Portfolio content ----------
   Edit this file to add or remove work shown in the "Portfolio" section.
   No other file needs to change.

   Text fields can be a plain string (same in both languages) or an object
   { fr: "...", en: "..." } when the wording differs per language.

   COMICS
     title        Title of the comic.
     languages    Language pair, e.g. "EN → FR".
     description  Optional short note (context, client, what you did).
     cover        Path to the cover image, e.g. "images/comics/my-comic/cover.jpg".
     pages        Optional list of page images shown in the viewer when the
                  card is clicked (put the translated pages here). If empty,
                  the cover alone is shown.
     link         Optional URL to the full work (PDF, publisher page, ...).

   VIDEOS
     title        Title of the video.
     youtubeId    The ID from the YouTube URL: for
                  https://www.youtube.com/watch?v=dQw4w9WgXcQ the ID is dQw4w9WgXcQ
     languages    Language pair, e.g. "HI → FR".
     subtitleLang Optional language code of your subtitles ("fr", "en", "hi"):
                  the player then opens with those subtitles switched on.
     description  Optional short note.
*/
window.PORTFOLIO = {
  comics: [
    {
      title: "Translation Portfolio",
      languages: "FR → EN",
      description: {
        fr: "Traduction de planches de bande dessinée du français vers l'anglais. Travail complet incluant le lettrage et l'adaptation culturelle.",
        en: "Comic translation from French to English. Complete work including lettering and cultural adaptation."
      },
      cover: "portfolio/2.JPEG",
      pages: [
        "portfolio/2.JPEG",
        "portfolio/3.JPEG",
        "portfolio/9.JPEG",
        "portfolio/10.JPEG",
        "portfolio/11.JPEG",
        "portfolio/13.JPEG",
        "portfolio/16.JPEG"
      ],
      link: ""
    }
  ],

  videos: [

  ]
};
