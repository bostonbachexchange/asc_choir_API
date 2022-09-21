const mongoose = require('mongoose')
const Song = require('./song')
const db = require('../../config/db')

const startSongs = [
    { title: 'May Nothing Evil Cross This Door', composer: 'Robert N. Quaile', lyricist: 'Louis Untermeyer', type: 'Hymn', hymnNumber: 1, source: "Singing the Living Tradition",
    lyrics: '|`|May nothing evil cross this door,|and may ill fortune never pry about|these windows; may the roar|and rain go by.| `|By faith made strong, the rafters will|withstand the battering of the storm.|This hearth, though all the world grow chill,|will keep you warm.|`|Peace shall walk softly |through these rooms,|touching our lips with holy wine,|till every casual corner blooms|into a shrine.|`|With laughter drown the raucous shout,|and, though these sheltering walls are thin,|may they be strong to keep hate out|and hold love in.',
    scorePDF: '', recordings: '', embedId: ["C4rSAIts3MA", "idsCla_AnF4"], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Down the Ages We Have Trod', composer: 'THOMAS (TOM) BENJAMIN', lyricist: 'JOHN ANDREW STOREY', type: 'Hymn', hymnNumber: 2, source: "Singing the Living Tradition",
    lyrics: '',
    scorePDF: '', recordings: '', owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'The World Stands Out on Either Side', composer: 'W. FREDERICK WOODEN', lyricist: 'Edna St. Vincent Millay', type: 'Hymn', hymnNumber: 3, source: "Singing the Living Tradition",
    lyrics: '',
    scorePDF: '', recordings: '', owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'I Brought My Spirit to the Sea ', composer: 'Alec Wyton', lyricist: 'MAX KAPP', type: 'Hymn', hymnNumber: 4, source: "Singing the Living Tradition",
    lyrics: '',
    scorePDF: '', recordings: '', owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'It Is Something to Have Wept', composer: 'ROBERT L. SANDERS', lyricist: 'Gilbert Keith Chesterton', type: 'Hymn', hymnNumber: 5, source: "Singing the Living Tradition",
    lyrics: '',
    scorePDF: '', recordings: '', owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Just as Long as I Have Breath ', composer: 'Johann G. Ebeling', lyricist: 'ALICIA S. CARPENTER', type: 'Hymn', hymnNumber: 6, source: "Singing the Living Tradition",
    lyrics: '',
    scorePDF: '', recordings: 'https://www.youtube.com/watch?v=-e_233Td-0o', embedId: ['-e_233Td-0o'], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'The Leaf Unfurling', composer: 'John Corrado', lyricist: 'DON COHEN', type: 'Hymn', hymnNumber: 7, source: "Singing the Living Tradition",
    lyrics: '',
    scorePDF: '', recordings: '', owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Mother Spirit, Father Spirit', composer: 'NORBERT ČAPEK (Capek)', lyricist: 'NORBERT ČAPEK (Capek), RICHARD FREDERICK BOEKE', type: 'Hymn', hymnNumber: 8, source: "Singing the Living Tradition",
    lyrics: '',
    scorePDF: '', recordings: 'https://www.youtube.com/watch?v=rBmU_uj7i18', embedId: ['rBmU_uj7i18'], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'No Longer Forward or Behind', composer: 'English Folk Song', lyricist: 'JOHN GREENLEAF WHITTIER', type: 'Hymn', hymnNumber: 9, source: "Singing the Living Tradition",
    lyrics: '',
    scorePDF: '', recordings: '', owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Come, Come, Whoever You Are', composer: 'Lynn Adair Ungar', lyricist: 'Adapt. from Rumi', type: 'Hymn', hymnNumber: 188, source: "Singing the Living Tradition",
    lyrics: 'Come, come, whoever you are, |wanderer, worshiper, lover of leaving. |Ours is no caravan of despair. |Come, yet again come.',
    scorePDF: 'STLT188', recordings: '', embedId: ['tVafTtcBAJY'], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Hashiveinu', composer: 'Traditional Hebrew', lyricist: 'Traditional Hebrew', type: 'hymn', hymnNumber: 216, source: "Singing the Living Tradition",
    lyrics: 'Hebrew Lyrics (phonetic): | ` |Hashivenu, hashivenu Adonai elecha |Venashuva venashuva |Hadesh Hadesh yamenuke ke dem |` |` |English Translation: |` |Turn us back, turn us back, O LORD to You |and we will turn, and we will turn |renew, renew our days as before | ` |Lamentations 5:21',
    scorePDF: 'STLT216', recordings: '', embedId: ['4pnP3q6WPr0', ], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'We Would Be One', composer: 'Jean Sibelius', lyricist: 'Samuel Anthony Wright', type: 'Hymn', hymnNumber: 318, source: "Singing the Living Tradition",
    lyrics: 'We would be one as now we join in singing |our hymn of love, to pledge ourselves anew |to that high cause of greater understanding |of who we are, and what in us is true. |`|We would be one in living for each other |to show to all a new community. |We would be one in building for tomorrow |a nobler world than we have known today. |`|We would be one in searching for that meaning |which binds our hearts and points us on our way. |As one, we pledge ourselves to greater service, |with love and justice, strive to make us free.',
    scorePDF: 'STLT318', recordings: '', embedId: ['IMn0QdiTzQM'], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'We Laugh, We Cry', composer: 'Shelley Jackson Denham, harmony by Betsy Jo Angebranndt', lyricist: 'Shelley Jackson Denham', type: 'Hymn', hymnNumber: 354, source: "Singing the Living Tradition",
    lyrics: 'We laugh, we cry, we live, we die; we dance, we sing our song.|We need to feel there’s something here to which we can belong.|We need to feel the freedom just to have some time alone.|But most of all we need close friends we can call our very own.|And we believe in life, and in the strength of love;|and we have found a need to be together.|We have our hearts to give, we have our thoughts to receive;|and we believe that sharing is an answer.|`|A child is born among us and we feel a special glow. |We see time’s endless journey as we watch the baby grow. |We thrill to hear imagination freely running wild. |We dedicate our minds and heart to the spirit of this child. |And we believe in life, and in the strength of love; |and we have found a time to be together. |And with the grace of age, we share the wonder of youth, |and we believe that growing is an answer.|`||Our lives are full of wonder and our time is very brief.|The death of one among us fills us all with pain and grief.|But as we live, so shall we die, and when our lives are done|the memories we shared with friends, they will linger on and on.|And we believe in life, and in the strength of love;|and we have found a place to be together.|We have the right to grow, we have the gift to believe|that peace within our living is an answer.|`|We seek elusive answers to the questions of this life.|We seek to put an end to all the waste of human strife.|We search for truth, equality, and blessed peace of mind.|And then, we come together here, to make sense of what we find.|And we believe in life, and in the strength of love,|and we have found a joy being together.|And in our search for peace, maybe we’ll finally see:|even to question, truly is an answer.',
    scorePDF: 'STLT354', recordings: '', embedId: ['ckTv0ZEB36E'], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Enter, Rejoice, and Come In', composer: 'Louise Ruspini', lyricist: 'Louise Ruspini', type: 'Hymn', hymnNumber: 361, source: "Singing the Living Tradition",
    lyrics: "|Enter, rejoice, and come in.|Enter, rejoice, and come in. |Today will be a joyful day; |enter, rejoice, and come in. |`|Open your ears to the song…|`|Open your hearts ev’ryone…|`|Don’t be afraid of some change…|`|Enter, rejoice, and come in…',",
    scorePDF: '', recordings: '', embedId: ['WIeHgNgG9m0'], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Gathered Here', composer: 'Philip A. Porter', lyricist: 'Philip A. Porter', type: 'Hymn', hymnNumber: 389, source: "Singing the Living Tradition",
    lyrics: 'Gathered here in the mystery of the hour. |Gathered here in one strong body. |Gathered here in the struggle and the power. |Spirit, draw near.',
    scorePDF: 'STLT389', recordings: '', embedId: ['qLtxMda7_Ko'], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Return Again', composer: 'Shlomo Carlebach', lyricist: 'Shlomo Carlebach', type: 'Hymn', hymnNumber: 1011, source: "Singing the Living Tradition",
    lyrics: 'Return again, Return again, |Return to the home of your soul, |Return to who you are, Return to what you are, |Return to where you are |born and rebord again.',
    scorePDF: 'STJ1011', recordings: '', embedId: ['4KQzSwcvaWs', 'KkxWD2p9cxs', 'OEsMlW3mB4I'], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'We Begin Again in Love', composer: 'Les Kleen', lyricist: 'Robert Eller-Isaacs', type: '', hymnNumber: 1037, source: "Singing the Living Tradition",
    lyrics: 'We forgive ourselves and each other. We begin again in love.',
    scorePDF: 'STJ1037', recordings: '', embedId: ['o8sAXt-eES8'], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Be Ours a Religion', composer: 'Thomas Benjamin', lyricist: 'Theodore Parker', type: 'Hymn', hymnNumber: 1058, source: "Singing the Journey",
    lyrics: 'Be ours a religion which like sunshine goes everywhere, |its temple all space, its shrine the good heart, |its creed all truth, its ritual works of love.',
    scorePDF: 'STJ1058', recordings: '', embedId: ['C3Mh_ZENoek', 'kplr4KjETRQ'], owner: '63019b25ae6e795c6c8e9eb7'},
    // { title: '', composer: '', lyricist: '', type: '', hymnNumber: 0, source: "Singing the Living Tradition",
    // lyrics: '',
    // scorePDF: '', recordings: '', embedId: '', owner: '63019b25ae6e795c6c8e9eb7'},
]

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        //to only delete songs without an owner pass in {owner: null}
        Song.deleteMany()
            .then(deletedSongs => {
                console.log('deletedSongs', deletedSongs)
                Song.create(startSongs)
                    .then(newSongs => {
                        console.log('the new songs', newSongs)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })