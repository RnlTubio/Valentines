import { UserData, LoveLetter, RelationshipType } from '@/types';

const romanticMessages = {
    boyfriend: [
        {
            greeting: "To my dearest {recipient},",
            body: "Every moment with you feels like a dream I never want to wake up from. Your smile lights up my darkest days, and your love gives me strength. You are my everything, my heart, my soul, my forever. I fall more in love with you with each passing day.",
            closing: "Forever yours, {sender} ❤️"
        },
        {
            greeting: "My beloved {recipient},",
            body: "You are the reason my heart beats with joy. In your eyes, I see my future, and in your arms, I find my home. Thank you for being the most amazing boyfriend anyone could ask for. You make every day an adventure filled with love.",
            closing: "All my love, {sender} 💕"
        },
        {
            greeting: "Dear {recipient},",
            body: "Words cannot express how much you mean to me. You've turned my world into a beautiful paradise. Your kindness, your laughter, your touch - everything about you makes me fall deeper in love. I'm so grateful to have you in my life.",
            closing: "With all my heart, {sender} 💖"
        }
    ],
    girlfriend: [
        {
            greeting: "To my beautiful {recipient},",
            body: "You are the sunshine that brightens my every morning and the stars that light up my nights. Your love has transformed my life in ways I never imagined possible. Every second with you is a treasure I hold close to my heart.",
            closing: "Eternally yours, {sender} 💗"
        },
        {
            greeting: "My darling {recipient},",
            body: "In a world full of chaos, you are my peace. Your smile is my favorite sight, and your happiness is my greatest wish. I promise to love you more with each sunrise and cherish you beyond forever. You are my dream come true.",
            closing: "Always and forever, {sender} 💝"
        },
        {
            greeting: "Dearest {recipient},",
            body: "You've painted my life with colors I never knew existed. Your love is the melody my heart dances to. Thank you for being you - beautiful, kind, and absolutely perfect in every way. I love you more than words can say.",
            closing: "With endless love, {sender} 💞"
        }
    ],
    husband: [
        {
            greeting: "To my wonderful husband {recipient},",
            body: "Through all the years we've shared, my love for you has only grown stronger. You are my rock, my partner, my best friend. Thank you for building this beautiful life with me. Every day with you is a blessing I cherish.",
            closing: "Your loving wife, {sender} ❤️"
        },
        {
            greeting: "My dear {recipient},",
            body: "You make every ordinary moment extraordinary. Your strength, your wisdom, and your unwavering love continue to amaze me. I'm so proud to call you my husband and grateful for every memory we create together.",
            closing: "Forever yours, {sender} 💕"
        }
    ],
    wife: [
        {
            greeting: "To my beloved wife {recipient},",
            body: "You are the love of my life, my soulmate, my everything. Your grace and beauty, both inside and out, leave me in awe every single day. Thank you for choosing to walk this journey of life with me. I love you more than you'll ever know.",
            closing: "Your devoted husband, {sender} 💖"
        },
        {
            greeting: "My precious {recipient},",
            body: "Every day I wake up grateful that you're mine. Your love has made me a better person, and your presence makes our house a home. You are my greatest adventure and my sweetest blessing.",
            closing: "With all my love, {sender} 💗"
        }
    ],
    mother: [
        {
            greeting: "To my dearest Mom {recipient},",
            body: "Your love has been my guiding light since the day I was born. Thank you for your endless sacrifices, your warm hugs, and your unconditional love. You are my hero, my inspiration, and my greatest blessing. I love you more than words can express.",
            closing: "With all my love, {sender} 💝"
        },
        {
            greeting: "Dear Mom {recipient},",
            body: "No words can truly capture how much you mean to me. Your strength, wisdom, and kindness have shaped who I am today. Thank you for always believing in me and loving me unconditionally. You are simply the best.",
            closing: "Your loving child, {sender} 💕"
        }
    ],
    father: [
        {
            greeting: "To my amazing Dad {recipient},",
            body: "You've been my hero, my teacher, and my biggest supporter. Thank you for showing me what strength and love truly mean. Your guidance has shaped my life in countless ways. I'm so proud to be your child.",
            closing: "With love and gratitude, {sender} ❤️"
        },
        {
            greeting: "Dear Dad {recipient},",
            body: "Your wisdom and love have been the foundation of my life. Thank you for all the sacrifices you've made and for always being there when I needed you. You are my role model and my inspiration.",
            closing: "Love always, {sender} 💙"
        }
    ],
    son: [
        {
            greeting: "To my wonderful son {recipient},",
            body: "Watching you grow has been the greatest joy of my life. You make me proud every single day with your kindness, strength, and beautiful heart. I love you more than you could ever imagine.",
            closing: "With endless love, {sender} 💙"
        },
        {
            greeting: "Dear {recipient},",
            body: "You are my pride and joy, my greatest achievement. Your smile brightens my world, and your happiness is all I wish for. Thank you for being such an amazing son. I love you to the moon and back.",
            closing: "Always, {sender} ❤️"
        }
    ],
    daughter: [
        {
            greeting: "To my precious daughter {recipient},",
            body: "You are my sunshine, my little star, my everything. Watching you grow into the amazing person you are fills my heart with joy. I love you more than all the stars in the sky.",
            closing: "Forever and always, {sender} 💖"
        },
        {
            greeting: "My sweet {recipient},",
            body: "You've brought so much love and light into my life. Your kindness, your laughter, and your beautiful spirit make every day brighter. I'm so blessed to be your parent. I love you endlessly.",
            closing: "With all my heart, {sender} 💕"
        }
    ],
    child: [
        {
            greeting: "To my beloved {recipient},",
            body: "You are my greatest gift, my pride and joy. Every day with you is a blessing that fills my heart with happiness. Thank you for being you - wonderful, unique, and absolutely perfect. I love you more than words can say.",
            closing: "Always and forever, {sender} 💝"
        }
    ],
    grandma: [
        {
            greeting: "To my dear Grandma {recipient},",
            body: "Your love and wisdom have been a treasure in my life. Thank you for all the wonderful memories, the warm hugs, and the unconditional love. You hold a special place in my heart that no one else can fill.",
            closing: "With love, {sender} 💕"
        },
        {
            greeting: "Dearest Grandma {recipient},",
            body: "You are a blessing and an inspiration. Your stories, your kindness, and your love have shaped who I am. Thank you for being such an amazing grandmother. I love you so much.",
            closing: "Your loving grandchild, {sender} ❤️"
        }
    ],
    grandpa: [
        {
            greeting: "To my wonderful Grandpa {recipient},",
            body: "Your strength, wisdom, and love have been guiding lights in my life. Thank you for all the lessons you've taught me and for always making me feel special. You are truly one of a kind.",
            closing: "With love and admiration, {sender} 💙"
        },
        {
            greeting: "Dear Grandpa {recipient},",
            body: "You've shown me what it means to be strong, kind, and loving. Thank you for all the memories we've shared and for always being there. I'm so grateful to have you in my life.",
            closing: "Love always, {sender} ❤️"
        }
    ],
    friend: [
        {
            greeting: "To my dear friend {recipient},",
            body: "Your friendship means the world to me. Thank you for always being there, for the laughter, the support, and the countless memories we've created together. You make life so much brighter.",
            closing: "With appreciation, {sender} 💛"
        },
        {
            greeting: "Dear {recipient},",
            body: "I'm so grateful to have a friend like you. Your kindness, your humor, and your loyalty are gifts I treasure every day. Thank you for being an amazing friend.",
            closing: "Warmly, {sender} 💚"
        }
    ],
    'best friend': [
        {
            greeting: "To my best friend {recipient},",
            body: "You know me better than anyone else, and you love me anyway! Thank you for being my partner in crime, my shoulder to cry on, and my biggest cheerleader. Life is so much better with you in it.",
            closing: "Your best friend forever, {sender} 💛"
        },
        {
            greeting: "Dear {recipient},",
            body: "You're not just my best friend - you're family. Thank you for all the adventures, the late-night talks, and for always having my back. I don't know what I'd do without you.",
            closing: "BFFs always, {sender} 💚"
        }
    ]
};

export function generateLoveLetter(userData: UserData): LoveLetter {
    const messages = romanticMessages[userData.relationshipType] || romanticMessages.friend;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const body = (userData.message && userData.message.trim().length > 0)
        ? userData.message
        : randomMessage.body;

    return {
        greeting: randomMessage.greeting.replace('{recipient}', userData.recipientName),
        body: body,
        closing: randomMessage.closing
            .replace('{sender}', userData.senderName)
            .replace('{recipient}', userData.recipientName)
    };
}
