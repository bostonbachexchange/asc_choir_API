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
    { title: 'We Begin Again in Love', composer: 'Solesmes version of plainsong melody, adapt', lyricist: 'Anna Akhmatova; translation by Mark L. Belletini', type: 'Hymn', hymnNumber: 336, source: "Singing the Living Tradition",
    lyrics: '|All my memories of love hang upon high stars. |All the souls I’ve lost to tears now the autumn jars, |and the air around me here thickens with their song, |sing again their name-less tunes, sing again, and strong. |`|Willows in September touch the water clear, |set among the rushes tall of the flowing year. |Rising up from sunlit past comes the shadowed sigh |running toward me silently, love to fortify. |`|Many are the graceful hearts hung upon this tree. |And it seems there’s room for mine on these branches free, |and the sky above the tree, whether wet or bright, |is my ease and comforting, my good news and light.',
    scorePDF: 'STLT336', recordings: '', embedId: ['ti0HclGpL8E'], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Let There Be Peace On Earth', composer: 'Sy Miller & Jill Jackson', lyricist: '', type: '', hymnNumber: 521, source: '',
    lyrics: 'Words for UU Service|`|Let there be peace on earth |And let it begin with me. |Let there be peace on earth |The peace that was meant to be. |`|With love as a foundation, |We\'re one family.|Let us walk with each other |In perfect harmony. |`| Let peace begin with me, |`|Let this be the moment now. |With ev\'ry step I take |Let this be my solemn vow; |`|To take each moment |And live each moment |with peace eternally. |Let there be peace on earth, |And let it begin with me.|`|`|`Traditional Words|`|Let there be peace on earth |And let it begin with me. |Let there be peace on earth |The peace that was meant to be. |With God as our Father |Brothers all are we.|Let me walk with my brother |In perfect harmony. | Let peace begin with me, |`|Let   this be the moment now. |With ev\'ry step I take |Let this be my solemn vow; |To take each moment and live |Each moment in peace eternally. |Let there be peace on earth And let it begin with me.',
    scorePDF: '', webScore: ['https://hymnary.org/page/fetch/CSH2017/140/low','https://hymnary.org/page/fetch/CSH2017/141/low'], recordings: '', embedId: ['T-K87v__Zos'], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Chalice Song', composer: 'Mae Higgins arr. Tom Benjamin', lyricist: 'Mae Higgins', type: 'choral response', hymnNumber: 11, source: "Choral Responses",
    lyrics: 'Chalice, chalice burning bright, |Help remind us with your light, |of how we\'d like to live each day, |with love and truth helping lead the way.',
    scorePDF: 'CR11', recordings: '', owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Make Me a Channel of Your Peace', composer: 'Sebastian Temple', lyricist: 'Sebastian Temple', type: 'Choral', source: "",
    lyrics: 'Make me a channel of your peace. |Where there is hatred let me bring your love. |Where there is injury, your pardon, Lord |And where there\'s doubt, true faith in you. |` |Oh, Master grant that I may never seek |So much to be consoled as to console |To be understood as to understand |To be loved as to love with all my soul. |` |Make me a channel of your peace |Where there\'s despair in life, let me bring hope |Where there is darkness, only light |And where there\'s sadness, ever joy. |` |Oh, Master grant that I may never seek |So much to be consoled as to console |To be understood as to understand |To be loved as to love with all my soul. |` |Make me a channel of your peace |It is in pardoning that we are pardoned |In giving to all men that we receive |And in dying that we\'re born to eternal life. ', scorePDF: 'makeMeAChannel', recordings: '', embedId: ['7mxO_dsvHew','rD33W6vVpNI',], owner: '63019b25ae6e795c6c8e9eb7'},
    { title: 'Gather the Spirit', composer: 'Jim Scott', lyricist: 'Jim Scott', type: 'hymn', hymnNumber: 347, source: "Singing the Living Tradition",
    lyrics: "|Gather the spirit, harvest the power. |Our sep’rate fires will kindle one flame. |Witness the mystery of this hour. |Our trials in this light appear all the same. |`` |(Chorus) |Gather in peace, gather in thanks. |Gather in sympathy now and then. |Gather in hope, compassion and strength. |Gather to celebrate once again. |`` |Gather the spirit of heart and mind. |Seeds for the sowing are laid in store. |Nurtured in love, and conscience refined, |with body and spirit united once more. |`` |(Chorus) |`` |Gather the spirit growing in all, |drawn by the moon and fed by the sun. |Winter to spring, and summer to fall, |the chorus of life resounding as one. |`` |(Chorus)",
    scorePDF: 'STLT347', recordings: '', embedId: ['-24CCx_KK58','beImIhB2_08','bVbV1Ykf4SA'], owner: '632a0d10220197d54dc98cf1'},
    { title: 'We\'ll Build a Land', composer: 'Carolyn McDade, arr. by Betsy Jo Angebranndt', lyricist: 'Barbara Zanotti', type: 'hymn', hymnNumber: 121, source: "Singing the Living Tradition",
    lyrics: "We’ll build a land where we bind up the broken. |We’ll build a land where the captives go free, |where the oil of gladness dissolves all mourning. |Oh, we’ll build a promised land that can be. |`` |(Chorus) |Come build a land where sisters and brothers, |anointed by God, may then create peace: |where justice shall roll down like waters, |and peace like an ever flowing stream. |`` |We’ll build a land where we bring the good tidings |to all the afflicted and all those who mourn. |And we’ll give them garlands instead of ashes. |Oh, we’ll build a land where peace is born. |(Chorus) |`` |We’ll be a land building up ancient cities, |raising up devastations from old; |restoring ruins of generations. |Oh, we’ll build a land of people so bold. |(Chorus) |`` |Come, build a land where the mantles of praises |resound from spirits once faint and once weak; |where like oaks of righteousness stand her people. |Oh, come build the land, my people we seek. |(Chorus)",
    scorePDF: 'STLT121', recordings: '', embedId: ['WigNq8QDaMA','5ohFxzVjx1M','mcVry_exa2k'], owner: '632a0d10220197d54dc98cf1'},
    { title: 'Ancient Mother', composer: 'Traditional Navajo prayer', lyricist: 'Traditional Navajo prayer', type: 'hymn', hymnNumber: 1069, source: "Singing the Journey",
    lyrics: 'Ancient Mother, I hear you calling. |Ancient Mother, I hear your song. |Ancient Mother, I feel your laughter. |Ancient Mother, I taste your tears.',
    scorePDF: 'STJ1069', recordings: '', embedId: ['hgvuyJ3V8Ok','kqeuT1iLHyg'], owner: '632a0d10220197d54dc98cf1'},
    { title: 'Building Bridges', composer: '', lyricist: '', type: '', hymnNumber: 0, source: "Singing the Living Tradition",
    lyrics: '',
    scorePDF: '', recordings: '', embedId: '', owner: '632a0d10220197d54dc98cf1'},
    // { title: '', composer: '', lyricist: '', type: '', hymnNumber: 0, source: "Singing the Living Tradition",
    // lyrics: '',
    // scorePDF: '', recordings: '', embedId: '', owner: '632a0d10220197d54dc98cf1'},
    // { title: '', composer: '', lyricist: '', type: '', hymnNumber: 0, source: "Singing the Living Tradition",
    // lyrics: '',
    // scorePDF: '', recordings: '', embedId: '', owner: '632a0d10220197d54dc98cf1'},
    // { title: '', composer: '', lyricist: '', type: '', hymnNumber: 0, source: "Singing the Living Tradition",
    // lyrics: '',
    // scorePDF: '', recordings: '', embedId: '', owner: '632a0d10220197d54dc98cf1'},
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