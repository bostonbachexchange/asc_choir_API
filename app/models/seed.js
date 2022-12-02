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

    { title: 'We Begin Again in Love', composer: 'Les Kleen', lyricist: 'Robert Eller-Isaacs', type: '', hymnNumber: 1037, source: "Singing the Journey",
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
    scorePDF: 'CR11', recordings: {soprano: 'CR11_soprano', alto: 'CR11_alto', tenor: 'CR11_tenor', bass: 'CR11_bass', satb: 'CR11_satb'}, owner: '63019b25ae6e795c6c8e9eb7'},

    { title: 'Make Me a Channel of Your Peace', composer: 'Sebastian Temple', lyricist: 'Sebastian Temple', type: 'Choral', source: "",
    lyrics: 'Make me a channel of your peace. |Where there is hatred let me bring your love. |Where there is injury, your pardon, Lord |And where there\'s doubt, true faith in you. |` |Oh, Master grant that I may never seek |So much to be consoled as to console |To be understood as to understand |To be loved as to love with all my soul. |` |Make me a channel of your peace |Where there\'s despair in life, let me bring hope |Where there is darkness, only light |And where there\'s sadness, ever joy. |` |Oh, Master grant that I may never seek |So much to be consoled as to console |To be understood as to understand |To be loved as to love with all my soul. |` |Make me a channel of your peace |It is in pardoning that we are pardoned |In giving to all men that we receive |And in dying that we\'re born to eternal life. ', scorePDF: 'makeMeAChannel', recordings: '', embedId: ['7mxO_dsvHew','rD33W6vVpNI',], owner: '63019b25ae6e795c6c8e9eb7'},

    { title: 'Sing With Joy, Sing Noel! (Personent Hodie)', composer: 'Traditional 14th-century German arr. Brad Printz', lyricist: 'traditional, English Alt by Brad Printz', type: 'Choral', source: "",
    lyrics: 'Personent hodie voces puerulae, |Laudantes jucunde Qui nobis est natus, |Summo Deo datus.  |` |Ideo, Ideo, Ideo, Ideo |Ideo gloria in excelsis Deo! |` |Sing with joy, sing noel, on this day all is well. |To despair, say farewell, Sing with merry voices. |All the world rejoices. |` |Ideo, Ideo, Ideo, Ideo |Ideo gloria in excelsis Deo! |` |Breezes mild, gently blow, Silently falls the snow |down to earth. Now bestow joyful exaltation. |peaceful jubilation. |` |Ideo, Ideo, Ideo, Ideo |Ideo gloria in excelsis Deo! |` |Sing with joy, sing noel, on this day all is well. |To despair, say farewell, Sing with merry voices. |All the world rejoices. |` |Ideo, Ideo, Ideo, Ideo |Ideo gloria in excelsis Deo! |` |Sing with joy! Sing noel!  |Sing with jubilation! |Sing we noel!', scorePDF: 'SingWithJoy', recordings: '', embedId: ['axHuOf7jzEI','YWRBIL_Izj8', '26mimCKpYyE', '_H2zKLBfQNY'], owner: '63019b25ae6e795c6c8e9eb7'},

    { title: 'Gather the Spirit', composer: 'Jim Scott', lyricist: 'Jim Scott', type: 'hymn', hymnNumber: 347, source: "Singing the Living Tradition",
    lyrics: "|Gather the spirit, harvest the power. |Our sep’rate fires will kindle one flame. |Witness the mystery of this hour. |Our trials in this light appear all the same. |`` |(Chorus) |Gather in peace, gather in thanks. |Gather in sympathy now and then. |Gather in hope, compassion and strength. |Gather to celebrate once again. |`` |Gather the spirit of heart and mind. |Seeds for the sowing are laid in store. |Nurtured in love, and conscience refined, |with body and spirit united once more. |`` |(Chorus) |`` |Gather the spirit growing in all, |drawn by the moon and fed by the sun. |Winter to spring, and summer to fall, |the chorus of life resounding as one. |`` |(Chorus)",
    scorePDF: 'STLT347', recordings: '', embedId: ['-24CCx_KK58','beImIhB2_08','bVbV1Ykf4SA'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'We\'ll Build a Land', composer: 'Carolyn McDade, arr. by Betsy Jo Angebranndt', lyricist: 'Barbara Zanotti', type: 'hymn', hymnNumber: 121, source: "Singing the Living Tradition",
    lyrics: "We’ll build a land where we bind up the broken. |We’ll build a land where the captives go free, |where the oil of gladness dissolves all mourning. |Oh, we’ll build a promised land that can be. |`` |(Chorus) |Come build a land where sisters and brothers, |anointed by God, may then create peace: |where justice shall roll down like waters, |and peace like an ever flowing stream. |`` |We’ll build a land where we bring the good tidings |to all the afflicted and all those who mourn. |And we’ll give them garlands instead of ashes. |Oh, we’ll build a land where peace is born. |(Chorus) |`` |We’ll be a land building up ancient cities, |raising up devastations from old; |restoring ruins of generations. |Oh, we’ll build a land of people so bold. |(Chorus) |`` |Come, build a land where the mantles of praises |resound from spirits once faint and once weak; |where like oaks of righteousness stand her people. |Oh, come build the land, my people we seek. |(Chorus)",
    scorePDF: 'STLT121', recordings: '', embedId: ['WigNq8QDaMA','5ohFxzVjx1M','mcVry_exa2k'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'Ancient Mother', composer: 'Traditional Navajo prayer', lyricist: 'Traditional Navajo prayer', type: 'hymn', hymnNumber: 1069, source: "Singing the Journey",
    lyrics: 'Ancient Mother, I hear you calling. |Ancient Mother, I hear your song. |Ancient Mother, I feel your laughter. |Ancient Mother, I taste your tears.',
    scorePDF: 'STJ1069', recordings: '', embedId: ['hgvuyJ3V8Ok','kqeuT1iLHyg'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'Building Bridges', composer: 'Contemporary English Quaker Round', lyricist: 'The women of Greenham Common peace occupation in England, 1983', type: '', hymnNumber: 1023, source: "Singing the Journey",
    lyrics: "Building Bridges between our divisions, |I reach out to you, will you reach out to me? |With all of our voices and all of our visions, |friends, we could make such sweet harmony.",
    scorePDF: 'STJ1023', recordings: '', embedId: ['soWiJ-isHFg', 'jPKWpA4FM4g', '1gkxjAKzcOQ', 'pbUFW8haDps', 'GF3T3IfGaVY'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'Standing on the Side of Love', composer: 'Jason Shelton', lyricist: 'Jason Shelton', type: 'hymn', hymnNumber: 1014, source: "Singing the Journey",
    lyrics: "The promise of the Spirit: |faith, hope and love abide. |And so ev’ry soul |is blessed and made whole; |the truth in our hearts is our guide. |`` |Chorus: |`` |We are answering the call of love: |hands joined together as hearts beat as one. |Emboldened by faith, we dare to proclaim |we are answering the call of love. |`` |Sometimes we build a barrier |to keep love tightly bound. |Corrupted by fear, |unwilling to hear, |denying the beauty we’ve found. |`` |Chorus |`` |A bright new day is dawning |when love will not divide. |Reflections of grace |in ev’ry embrace, |fulfilling the vision divine. |`` |Chorus",
    scorePDF: 'STJ1014', recordings: [], embedId: ['oqdy-y9dVxg', 'jbUySQ4iAvU', 'Lmju_sWh8Js', 'ixtXqUSgwdY', 'zE5IWieY2HI'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'Everything Possible', composer: 'Fred Small arr. Willi Zwozdesky', lyricist: '', type: 'hymn', hymnNumber: 1019, source: "Singing the Journey",
    lyrics: "We have cleared off the table, the leftovers saved, washed the dishes and put them away. |I have told you a story and tucked you in tight at the end of your knockabout day. |As the moon sets its sail to carry you to sleep over the Midnight Sea, |Well, I will sign you a song no one sang to me—may it keep you good company. |`` |You can be anybody that you want to be, you can love whomever you will. |You can travel any country where your heart leads and know I will love you still. |You can live by yourself, you can gather friends around, you can choose one |special one. |And the only measure of your words and your deeds |Will be the love you leave behind when you’re gone. |`` |Some girls grow up strong and bold; some boys are quiet and kind. |Some race on ahead, some follow behind; some go in their own way and time. |Some women love women and some men love men. |Some raise children and some never do. |You can dream all the day, never reaching the end of everything possible for you. |`` |Don’t be rattled by names, by taunts or games, but seek out spirits true. |If you give your friends the best part of yourself, they will give the same back to you. |`` |You can be anybody that you want to be, you can love whomever you will. |You can travel any country where your heart leads and know I will love you still. |You can live by yourself, you can gather friends around, you can choose one special one. |And the only measure of your words and your deeds |Will be the love you leave behind when you’re gone. |Oh, the love you leave behind when you’re gone.",
    scorePDF: 'STJ1019', recordings: [], embedId: ['4R5OVCXh3kM', '3cC6f64d_Nc', '-sl2n0J3_LA', 'BSTM-GxJuLI', 'YhKMXmjTa3o'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'How Beautiful the March of Days', composer: 'English melody, arr. by Ralph Vaughan Williams', lyricist: 'Frances Whitmarsh Wile', type: 'hymn', hymnNumber: 57, source: "Singing the Living Tradition",
    lyrics: 'All beautiful the march of days, as seasons come and go; |the hand that shaped the rose hath wrought the crystal of the snow; |hath sent the hoary frost of heaven, the flowing waters sealed, |and laid a silent loveliness on hill and wood and field. | `|` |O’er white expanses sparkling clear the radiant morns unfold; |the solemn splendors of the night burn brighter through the cold; |life mounts in every throbbing vein, love deepens round the hearth, |and clearer sounds the angel-hymn, “Good will to all on earth.” | `|` |O Thou from whose unfathomed law the year in beauty flows, |thy self the vision passing by in crystal and in rose. |Day unto day doth utter speech, and night to night proclaim, |in ever changing words of light, the wonder of thy name.',
    scorePDF: 'STLT57', recordings: '', embedId: ['sPUmDTNpGPc', 'TqVmAkjvgQM', 'HCwnmGFUZbM'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'The Earth, Fire, Water, Air', composer: 'Anonymous', lyricist: 'Anonymous', type: 'hymn', hymnNumber: 387, source: "Singing the Living Tradition",
    lyrics: 'The earth, the water, the fire, the air, |return, return, return, return.',
    scorePDF: 'STLT387', recordings: '', embedId: ['WFB3tDNx85g'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'We Are', composer: 'Ysaye M. Barnwell', lyricist: 'Ysaye M. Barnwell', type: 'hymn', hymnNumber: 1051, source: "Singing the Journey",
    lyrics: 'For each child that’s born, |a morning star rises and |sings to the universe |who we are. | ` | `|For each child that’s born, |a morning star rises and |sings to the universe |who we are. | ` | `|We are our grandmothers’ prayers |and we are our grandfathers’ dreamings, |we are the breath of our ancestors, |we are the spirit of God. | ` |` |We are mothers of courage and fathers of time, |we are daughters of dust and the sons of great visions, |we’re sisters of mercy and brothers of love, |we are lovers of life and the builders of nations, |we’re seekers of truth and keepers of faith, |we are makers of peace and the wisdom of ages. | ` | `|We are our grandmothers’ prayers |and we are our grandfathers’ dreamings, |we are the breath of our ancestors, |we are the spirit of God. | ` | `|For each child that’s born, |a morning star rises and |sings to the universe |who we are.',
    scorePDF: 'STJ1051', recordings: '', embedId: ['xFq67p-047g','ylbrZOQObFo', 'fg9St_ftIjQ', 'dztxEgzYONw'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'When Our Heart Is in a Holy Place', composer: 'Joyce Poley', lyricist: 'Joyce Poley', type: 'hymn', hymnNumber: 1008, source: "Singing the Journey",
    lyrics: 'Chorus: |When our heart is in a holy place, |When our heart is in a holy place, |We are bless’d with love and amazing grace, |When our heart is in a holy place. |`` |When we trust the wisdom in each of us, |Ev’ry color ev’ry creed and kind, |And we see our faces in each other’s eyes, |Then our heart is in a holy place. |`` |Chorus |`` |When we tell our story from deep inside, |And we listen with a loving mind, |And we hear our voices in each other’s words, |Then our heart is in a holy place. |`` |Chorus |`` |When we share the silence of sacred space, |And the God of our Heart stirs within, |And we feel the power of each other’s faith, |Then our heart is in a holy place. |`` |Chorus',
    scorePDF: 'STJ1008', recordings: '', embedId: ['IRGYXf7Ip6A', 'Rcjuj6WPzcQ', 'OGW10y8KuNg', 'QfnJa4gyt9Y'], owner: '632a0d10220197d54dc98cf1'}, 
    
    { title: 'Meditation on Breathing', composer: 'Sarah Dan Jones', lyricist: 'Sarah Dan Jones', type: 'hymn', hymnNumber: 1009, source: "Singing the Journey",
    lyrics: 'When I breathe in, |I’ll breathe in peace. |When I breathe out, |I’ll breathe out love. |` |Breathe in, Breathe out, |Breathe in, Breathe out',
    scorePDF: 'STJ1009', recordings: '', embedId: ['YHHxeDludT4', 'VuAd-yImOt4', 'IRl8Y4RIQqo'], owner: '632a0d10220197d54dc98cf1'}, 

    { title: 'Do When the Spirit Says Do', composer: 'African-American spiritual arr. Mark Freundt', lyricist: 'African-American spiritual, civil rights period', type: 'hymn', hymnNumber: 1024, source: "Singing the Journey",
    lyrics: 'You got to do when the spirit says do! |You got to do when the spirit says do! |When the spirit says do, you got to do, oh Lord! |You got to do when the spirit says do! |Spirit says do (6x) |`|` |Other verses may include sing, dance, laugh, shout, etc.',
    scorePDF: 'STJ1024', recordings: '', embedId: ['R2T497pklOk','lDfGM92V3XA', '6mDTUJPA6Cw'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'Open My Heart', composer: 'Henry S. Flurry', lyricist: 'Henry S. Flurry', type: 'hymn', hymnNumber: 1013, source: "Singing the Journey",
    lyrics: 'Open my heart to all that I seek; |Let me be part of the Love You give.',
    scorePDF: 'STJ1013', recordings: '', embedId: ['j5F8bMPHVKo', 'W0xKDJ0bNGE', 'JlsCgNMOsTE'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'Woyaya', composer: 'Loughty Amoa, Solomon Amarfino, Rovert M. BAiley, Roy Bedeau, Francis T. Osei, Whendell K. Richardson, and Mac Tontoh. Arr. Jeannie Gagné', lyricist: 'Transcribed from Ysaye M. Barnwell', type: 'hymn', hymnNumber: 1020, source: "Singing the Journey",
    lyrics: 'We are going, |heaven knows where we are going, |but we know within. |`` |And we will get there, |heaven knows how we will get there, |but we know we will. |`` |It will be hard, we know, |and the road will be muddy and rough, |but we’ll get there, |heaven knows how we will get there, |but we know we will. |`` |Woyaya, Woyaya, |Woyaya, Woyaya,',
    scorePDF: 'STJ1020', recordings: '', embedId: ['q9jWjfVtLiE', 'BwckMpR9V-Q', 'Eu64dovWjCM', 'SS9fFQTJXxM'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'We Are Not Our Own', composer: 'David Hurd', lyricist: 'Brian Wren', type: 'hymn', hymnNumber: 317, source: "Singing the Living Tradition",
    lyrics: 'We are not our own. Earth forms us, |human leaves on nature\’s growing vine, |fruit of many generations, |seeds of life divine. |`` |We are not alone. Earth names us: |past and present, peoples near and far, |family and friends and strangers |show us who we are. |`` |Therefore let us make thanksgiving, |and with justice, willing and aware, |give to earth, and all things living, |liturgies of care. |`` |Let us be a house of welcome, |living stone upholding living stone, |gladly showing all our neighbors |we are not our own!',
    scorePDF: 'STLT317', recordings: '', embedId: ['6amZCAYF4Kw', 'Hm1ZOJsRhVQ'], owner: '632a0d10220197d54dc98cf1'},

    { title: 'The Fire of Commitment', composer: 'Jason Shelton', lyricist: 'Mary Katherine Morn, Jason Shelton', type: 'hymn', hymnNumber: 1028, source: "Singing the Journey",
    lyrics: 'From the light of days remembered burns a beacon bright and clear |Guiding hands and hearts and spirits Into faith set free from fear. |`` |Chorus: |When the fire of commitment sets our mind and soul a blaze |When our hunger and our passion meet to call us on our way |When we live with deep assurance of the flame that burns within, |Then our promise finds fulfillment and our future can begin. |`` |From the stories of our living rings a song both brave and free, |Calling pilgrims still to witness to the life of liberty. |`` |Chorus |`` |From the dreams of youthful vision comes a new, prophetic voice, |Which demands a deeper justice built by our courageous choice |`` |Chorus',
    scorePDF: 'STJ1028', recordings: '', embedId: ['GPFjgJptaMk', 'AGJan0LD5JI', 'MkIBMnq0h6A', '2slrWwPr-gQ', '40Owj7jdO2Q'], owner: '632a0d10220197d54dc98cf1'},

    // { title: '', composer: '', lyricist: '', type: '', hymnNumber: 0, source: "Singing the Living Tradition",
    // lyrics: '',
    // scorePDF: '', recordings: '', embedId: [''], owner: '632a0d10220197d54dc98cf1'},
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