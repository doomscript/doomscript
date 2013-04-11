
// List of all raid ids and names. Any raid without a real raid id will not show up nicely.
DC_LoaTS_Helper.raids = 
{
	// Personal Raids
    sherlock_holmes:    new RaidType("sherlock_holmes",    "Z10", "The Murderer", "Murderer", "Murderer",             12,   1, "S",    [6000000, "N/A", "N/A", "N/A"]),
    your_wrath:         new RaidType("your_wrath",          "ZA", "Your Wrath", "Your Wrath", "Wrath",                12,   1, "S",   [10000000, "N/A", "N/A", "N/A"]),
    lubu:               new RaidType("lubu",               "ZA2", "LU BU", "LU BU", "Lubu",                           12,   1, "S",   [10000000, "N/A", "N/A", "N/A"]),
	
    // Public raids
    // Small Raids
    commander:          new RaidType("commander",           "Z1", "Centurian Commander", "CC Commander", "CC Comm",  168,  10, "S",     150000),
    ragebeasts:         new RaidType("ragebeasts",          "Z2", "Garlax Ragebeasts", "Ragebeasts", "Rage",         120,  10, "S",    2000000),
    cybertollahs:       new RaidType("cybertollahs",        "Z3", "Supreme Cybertollahs", "Cybertollahs", "Cyber-T",  72,  10, "S",    4000000),
    seth:               new RaidType("seth",                "Z4", "Nathaniel Vorden", "Vorden", "Vorden",             72,  10, "S",    6000000),
    purple_lion:        new RaidType("purple_lion",         "Z5", "Purple Lion", "Lion", "Lion",                      72,  10, "S",    8000000),
    scarlet_harlet:     new RaidType("scarlet_harlet",      "Z6", "The Scarlet Harlot", "Scarlet", "Harlot",          72,  10, "S",   10000000),
    lupin:              new RaidType("lupin",               "Z7", "Lupin", "Lupin", "Lupin",                          72,  10, "S",   12000000),
    lieutenant_targe:   new RaidType("lieutenant_targe",    "Z8", "Lieutenant Targe", "Targe", "Targe",              120,  10, "S",   14000000),
    sigurd:             new RaidType("sigurd",              "Z9", "Sigurd Spinebreaker", "Sigurd", "Sigurd",          72,  10, "S",   16000000),
    space_pox:          new RaidType("space_pox",           "P1", "Space Pox", "Pox", "Pox",                           5,  12, "S", [100000000, 500000000, 1000000000, 1500000000],/*FS calculated normally*/null,[35000000, 175000000, 350000000, 525000000]),
    quiskerian_temple:  new RaidType("quiskerian_temple",   "L1", "Quiskerian Temple", "Temple", "Temple",            10,  25, "S", [200000000, 1000000000, 2000000000, 3000000000]),
    missile_strike:     new RaidType("missile_strike",      "ZA", "Missile Strike", "Missiles", "Missile",            72,  10, "S",  [22000000, 28600000, 35200000, 44000000]),
    pi:                 new RaidType("pi",                 "ZA2", "Pi", "Pi", "Pi",                                   72,  10, "S",  [24000000, 31200000, 38400000, 48000000]),
    
    // Medium Raids
    "void":             new RaidType("void",                "Z1", "Centurian Void Killer", "Void Killer", "VK",      168,  50, "S",    5000000),
    carnus:             new RaidType("carnus",              "Z2", "Carnus 9000", "Carnus", "Carnus",                 120,  50, "S",   15000000),
    cruiser:            new RaidType("cruiser",             "Z3", "Centurian Cruiser", "CC Cruiser", "Cruiser",       72,  50, "S",   25000000),
    china:              new RaidType("china",               "Z4", "Blood Alley Gang", "Gang", "Gang",                 72,  50, "S",   35000000),
    advocate_tulk:      new RaidType("advocate_tulk",       "Z5", "Advocate Tulk", "Tulk", "Tulk",                    75,  50, "S",   45000000),
    caligula:           new RaidType("caligula",            "Z6", "Caligula", "Caligula", "Cali",                     72,  50, "S",   55000000),
    warden_ramiro:      new RaidType("warden_ramiro",       "Z7", "Warden Ramiro", "Ramiro", "Ramiro",                72,  50, "S",   60000000),
    vulture_gunship:    new RaidType("vulture_gunship",     "Z8", "Vulture Gunship", "Vulture", "Vulture",            72,  50, "S",   65000000),
    xarpa:              new RaidType("xarpa",               "Z9", "Centurian Fleet Commander", "Fleet Com.", "Fleet Comm",72,50,"S",  70000000),
    bachanghenfil:      new RaidType("bachanghenfil",      "Z10", "Bachanghenfil", "Bachanghenfil", "Bach",           72,  50, "S",   [75000000, 97500000, 120000000, 150000000]),
    gut_phager:         new RaidType("gut_phager",         "Z11", "Gut-Phager", "Gut-Phager", "Phager",               72,  50, "S",   [80000000, 104000000, 128000000, 160000000]),
    bashan:             new RaidType("bashan",              "ZA", "Bashan", "Bashan", "Bashan",                       72,  50, "S",   85000000),
    cyborg_shark:       new RaidType("cyborg_shark",        "ZA2", "Cyborg Shark", "C. Shark", "Shark",               72,  50, "S",   90000000),
    hulking_mutant:     new RaidType("hulking_mutant",      "Z15", "Hulking Mutant", "Mutant", "Mutant",              72,  50, "S",   90000000),
    screaming_barracuda: new RaidType("screaming_barracuda","Z16", "Screaming Barracuda", "Barracuda", "Barracuda",   72,  50, "S",  110000000),
    
    // Large Raids
    telemachus:         new RaidType("telemachus",          "Z1", "Telemachus", "Telemachus", "Tele",                168, 100, "S",   20000000),
    carnifex:           new RaidType("carnifex",            "Z2", "Carnifex Prime", "Carnifex", "Carni",             120, 100, "S",   35000000),
    rautha:             new RaidType("rautha",              "Z3", "Commander Rautha", "Rautha", "Rautha",             72, 100, "S",   50000000),
    assasin:            new RaidType("assasin",             "Z4", "Kelovar Assassin", "Assassin", "Assa",             72, 100, "S",   65000000),
    robotic_rautha:     new RaidType("robotic_rautha",      "Z5", "Robotic Rautha", "Rautha 2.0", "Robo Rautha",      75, 100, "S",   80000000),
    agony_and_ecstasy:  new RaidType("agony_and_ecstasy",   "Z6", "Agony and Ecstasy", "Agony, Ecstasy", "A&E",       72, 100, "S",   95000000),
    sun_xi:             new RaidType("sun_xi",              "Z7", "Sun Xi's Echo", "Psi-Echo", "Echo",                72, 100, "S",  100000000),
    sludge_serpent:     new RaidType("sludge_serpent",      "Z8", "Sludge Serpent", "Serpent", "Serpent",             72, 100, "S",  120000000),
    kalaxian_cult_mistress: new RaidType("kalaxian_cult_mistress","Z10","Kalaxian Cult-Mistress", "Cult-Mistress", "Cult",72, 100, "S", [180000000, 234000000, 288000000, 320000000]),
    shuborunth: 		new RaidType("shuborunth",         "Z13","Wublunralxanachi", "Blob", "Blob",                  72, 100, "S",  [200000000, 260000000, 320000000, 400000000]),
    birthday_cake_of_doom: new RaidType("birthday_cake_of_doom", "ZA","Birthday Cake of Doom", "Cake", "Cake",        72, 100, "S",  [250000000, 325000000, 400000000, 500000000]),
    anthropist_xenocide_warship:new RaidType("anthropist_xenocide_warship","ZA2","Anthropist Xenocide Warship","Xenocide","Xeno",72,100,"S",[300000000, 390000000, 480000000, 600000000]),
    tentacled_turkey:   new RaidType("tentacled_turkey",   "Z15","Tentacled Turkey","Turkey","Turkey",                72, 100, "S",  [350000000, 455000000, 560000000, 700000000]),
    where_music_meets:  new RaidType("where_music_meets",  "Z16","Symphony of Two Worlds","Symphony","Symphony",      72, 100, "S",  [400000000, 520000000, 640000000, 800000000]),

    // Epic Raids
    colonel:            new RaidType("colonel",             "Z1", "Psychic Colonel", "CC Colonel", "Col.",           168, 250, "S",  150000000),
    vespasia:           new RaidType("vespasia",            "Z2", "Vespasia's Android", "Vespasia Bot", "Vesp",      168, 250, "S",  250000000),
    generalrahn:        new RaidType("generalrahn",         "Z3", "Centurian General", "CC General", "General",      168, 250, "S",  350000000),
    natasha:            new RaidType("natasha",             "Z4", "Natasha Cybersmash", "Cybersmash", "Cyber-S",     168, 250, "S",  450000000),
    centurian_sentinel: new RaidType("centurian_sentinel",  "Z5", "Centurian Sentinel", "CC Sentinel", "Sentinel",   165, 250, "S",  550000000),
    mercury:            new RaidType("mercury",             "Z6", "Mercury", "Mercury", "Mercury",                    72, 250, "S",  700000000),
    hultex_quibberath:  new RaidType("hultex_quibberath",   "Z7", "Guldax Quibberath", "Quibberath", "Quib",         168, 250, "S",  800000000),
    commander_veck:     new RaidType("commander_veck",      "Z8", "Centurian Storm Commander", "Storm", "Storm",     168, 250, "S",  900000000),
    reaver:             new RaidType("reaver",              "Z9", "Galactic Reaver", "Reaver", "Reaver",              72, 250, "S", 1000000000),
    the_hat:            new RaidType("the_hat",            "Z10", "The Hat", "Hat", "Hat",         	                  72, 250, "S", [1100000000, 1475000000, 1850000000, 2200000000]),
    g_rahn:             new RaidType("g_rahn",             "Z12", "G. Rahn", "G. Rahn", "G. Rahn",                    72, 250, "S", [1200000000, 1560000000, 1920000000, 2400000000]),
    guan_yu:            new RaidType("guan_yu",             "ZA", "Guan Yu", "Guan", "Guan",                          72, 250, "S", [1300000000, 1690000000, 2080000000, 2600000000]),
    bile_beast:         new RaidType("bile_beast",         "ZA2", "Bile Beast", "Bile", "Bile",                       72, 250, "S", [1400000000, 1820000000, 2240000000, 2800000000]),
    al_husam:           new RaidType("al_husam",           "Z17", "Al-Husam", "Al-Husam", "Al-Husam",                 72, 250, "S", [1500000000, 1950000000, 2400000000, 3000000000]),
    noir:               new RaidType("noir",               "Z18", "Noir", "Noir", "Noir",                             72, 250, "S", [1600000000, 2080000000, 2560000000, 3200000000]),
    
    
    // Colossal Raids
    besalaad_warmaster: new RaidType("besalaad_warmaster",  "Z5", "Besalaad Warmaster", "Warmaster", "Warmaster",    160, 500, "S",  700000000),
    mermara:            new RaidType("mermara",             "Z6", "Mermara", "Mermara", "Mermara",                   168, 500, "S",  800000000),
    nemo:               new RaidType("nemo",                "Z7", "Nemo",    "Nemo", "Nemo",                         168, 500, "S", 1000000000),
    the_emperor:        new RaidType("the_emperor",         "Z8", "Dule's Robot", "Dule's Bot", "Dule",              168, 500, "S", 5000000000),
    dule_warmaster:     new RaidType("dule_warmaster",      "Z9", "Centurian Councilor", "CC Councilor", "Councilor", 24, 500, "S", 2500000000),
    crush_colossa:      new RaidType("crush_colossa",      "Z10", "Crush Colossa", "Colossa", "Crush",                72, 500, "S", [3000000000, 3900000000, 4800000000, 6000000000]),
    nosferatu_nick:     new RaidType("nosferatu_nick",     "Z14", "Nosferatu Nick", "Nick", "Nick",                   24, 500, "S", 3500000000),
    niflung_boar:       new RaidType("niflung_boar",        "ZA", "Niflung Boar", "Boar", "Boar",                     30, 500, "S", 4000000000),
    vlarg_relic_hunter: new RaidType("vlarg_relic_hunter", "ZA2", "Vlarg Relic Hunter", "R. Hunter", "Vlarg",         30, 500, "S", 4500000000),
    
    
    // Aliance Raids
    // Small Raids
    krakak:             new RaidType("krakak",              "A0", "Krakak Swarm", "Swarm", "Swarm",                  120,  10, "H",    4500000),
    kang:               new RaidType("kang",                "A1", "Kang", "Kang", "Kang",                            120,  10, "H",    5000000),
    crossbones_squadron: new RaidType("crossbones_squadron","A2", "Crossbones Squadron", "Crossbones", "XBones",     120,  10, "H",    8000000),
    colonel_mustard:    new RaidType("colonel_mustard",     "A3", "Colonel Mustard", "Mustard", "Mustard",           120,  10, "H",   12000000),
    professor_squid:    new RaidType("professor_squid",     "A4", "Professor Squid", "Squid", "Squid",               120,  10, "H",   18000000),
    terminus_death_squad: new RaidType("terminus_death_squad","A5", "Terminus Death Squad", "Death Squad", "Death Squad",120,10,"H",  24000000),
    rabid_reindeer:     new RaidType("rabid_reindeer",      "A8", "Rabid Reindeer", "Reindeer", "Reindeer",           60,  50, "H",  [62500000, 81250000, 100000000, 125000000]),
    
    // Medium Raids
    infection:          new RaidType("infection",           "A0", "Infected Squad",    "Infected", "Infected",       144,  50, "H",   30000000),
    flora:              new RaidType("flora",               "A1", "Ruomyes' Death Flora", "Death Flora", "Flora",    144,  50, "H",   35000000),
    psychic_cyborg:     new RaidType("psychic_cyborg",      "A2", "Mr. Justice", "Justice", "Justice",               144,  50, "H",   45000000),
    grislak:            new RaidType("grislak",             "A3", "Grislak", "Grislak", "Grislak",                   144,  50, "H",   55000000),
    qin_legion:         new RaidType("qin_legion",          "A4", "Qin Legion",    "Legion", "Legion",               144,  50, "H",   65000000),
    terminus_interceptor_squadron: new RaidType("terminus_interceptor_squadron","A5", "Terminus Interceptor Squadron", "Interceptor", "Interceptor", 144, 50,"H",75000000),
    luna:               new RaidType("luna",                "A6", "Luna", "Luna", "Luna",                            120,  50, "H",   50000000),
    trashmaster:        new RaidType("trashmaster",         "A6", "Trashmaster Colby", "Colby", "Colby",             144,  50, "H",  100000000),
    santas_workshop:    new RaidType("santas_workshop",     "A8", "SANTA's Workshop", "Workshop", "Workshop",         72,  50, "H",  125000000),

    // Large Raids
    saucers:            new RaidType("saucers",             "A0", "Flying Saucers",    "Saucers", "Saucers",         168,  100, "H",   55000000),
    tourniquet:         new RaidType("tourniquet",          "A1", "Tourniquet 7", "Tourniquet 7", "T7",              168,  100, "H",   60000000),
    rylattu_exterminator: new RaidType("rylattu_exterminator","A2", "Rylattu Exterminator", "Exterminator","Exterminator",168,100,"H",100000000),
    peacemaker_500:     new RaidType("peacemaker_500",      "A3", "Peacemaker 500",    "Peacemaker", "Peacemaker",   168,  100, "H",  140000000),
    kaltharan_devourer: new RaidType("kaltharan_devourer",  "A4", "Kaltharan Devourer", "Devourer", "Devourer",      168,  100, "H",  180000000),        
    terminus_juggernaut: new RaidType("terminus_juggernaut","A5", "Terminus Juggernaut", "Juggernaut", "Juggernaut", 168,  100, "H",  200000000),
    legacy_bot:         new RaidType("legacy_bot",          "A6", "Legacy Bot",    "Legacy", "Legacy",               168,  100, "H",  250000000),
    wahsh:              new RaidType("wahsh",               "AX", "Wahsh Al-Sahraa", "Wahsh", "Wahsh",                84,  100, "H", [500000000, 1200000000, 3125000000, 7812500000]),
    haunted_house:      new RaidType("haunted_house",       "AX", "Haunted House", "H. House", "House",              168,  100, "H",  350000000),
    crazed_santa:       new RaidType("crazed_santa",        "AX", "Crazed Santa", "Santa", "Santa",                   84,  100, "H", [400000000, 520000000, 640000000, 800000000]),
    kristy_love:        new RaidType("kristy_love",         "AX", "Kristy Love", "Kristy", "Love",                    84,  100, "H", [450000000, 585000000, 720000000, 900000000]),
    gedrocht:           new RaidType("gedrocht",            "AX", "Gedrocht", "Gedrocht", "Gedrocht",                 84,  100, "H", [500000000, 650000000, 800000000,1000000000]),
    
    // Epic Raids
    lurking_horror:     new RaidType("lurking_horror",      "A2", "Lurking Horror", "Lurking", "Lurking",            168,  250, "H",  250000000),
    ship_of_the_damned: new RaidType("ship_of_the_damned",  "A3", "Ship of the Damned", "Damned", "Damned",          168,  250, "H",  300000000),
    mecha_wyrm:         new RaidType("mecha_wyrm",          "A4", "Mecha-Wyrm", "Wyrm", "Wyrm",                      168,  250, "H",  350000000),
    contest_winners:    new RaidType("contest_winners",     "A6", "Shadows of the Void", "Shadows", "Shadows",       168,  250, "H",  500000000),
    genesis:            new RaidType("genesis",             "A5", "Genesis", "Genesis", "Genesis",                   165,  250, "H", 1000000000),
    celebration_enhancer_1: new RaidType("celebration_enhancer_1","AX","Celebration Enhancer J-54","Celebrator","Celeb",84,250, "H",  600000000),
    quiskan_psi_hound: new RaidType("quiskan_psi_hound",    "A7","Quiskan Psi-Hound","Psi-Hound","Hound",            168,  250, "H", [1000000000, 1500000000, 2500000000, 10000000000]),

    // Galaxy Dome Raids
    vince_vortex:       new RaidType("vince_vortex",        "GD", "Vince Vortex", "Vince", "Vince",                   72,  500, "E",  600000000),
    
    // World Raids
    // Infestation Trilogy
    inf_ship:           new RaidType("inf_ship",            "WR", "The Python", "Python", "Python WR",               100,  90000, "SEH", "Infinite", "N/A",   1000000000),
    inf_colony:         new RaidType("inf_colony",          "WR", "Infested Colony", "Colony", "Colony WR",          100,  90000, "SEH", "Infinite", "N/A",   1000000000),
    inf_lair:           new RaidType("inf_lair",            "WR", "Alien Lair", "Lair", "Lair WR",                   100,  90000, "SEH", "Infinite", "N/A",   1000000000),
    
    general_skorzeny:   new RaidType("general_skorzeny",    "WR", "General Skorzeny", "Skorzeny", "Skorz WR",         72,  90000, "SEH", "Infinite", "N/A", 100000000000),

    cerebral_destroyer: new RaidType("cerebral_destroyer",  "WR", "Cerebral Destroyer", "Cerebral", "CD WR",          72,  90000,"SEH", "Infinite", "N/A",   10000000000),
    
    wr_space_pox:       new RaidType("wr_space_pox",        "WR", "Intergalactic Space Pox", "WR Pox", "WR Pox",      72,  90000, "SEH", "Infinite", "N/A",   5000000000),

    kraken:             new RaidType("kraken",              "WR", "Kraken", "Kraken", "Kraken WR",                    72,  90000, "SEH", "Infinite", "N/A",  50000000000),
    
    christmas_montage:  new RaidType("christmas_montage",   "WR", "Christmas Campaign", "Christmas", "Xmas WR",       48,  90000, "SEH", "Infinite", "N/A",   5000000000),

    // Rare Spawns
    raging_snowman:     new RaidType("raging_snowman",      "RS", "Raging Snowman", "Snowman", "Snowman RS",          24,  90000, "SEH", "Infinite", "N/A",   2000000000),

    space_pox_mary:     new RaidType("space_pox_mary",      "RS", "Space Pox Mary", "Mary", "Mary RS",                24,  90000, "SEH", "Infinite", "N/A",   2000000000),
    	
    cerebral_ceo:       new RaidType("cerebral_ceo",        "RS", "Cerebral CEO", "CEO", "CEO RS",                    24,  90000, "SEH", "Infinite", "N/A",   2000000000),
    
    penelope_wellerd:   new RaidType("penelope_wellerd",    "RS", "Penelope Wellerd", "Wellerd", "Wellerd RS",        24,  90000, "SEH", "Infinite", "N/A",   2000000000)
    
};


