export interface Book {
  title: string;
  author: string;
  /** Date finished, as YYYY-MM-DD. */
  finished: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** A line or two of review. A book with a note becomes expandable. */
  note?: string;
}

/**
 * Books shown on `/reading/`, newest first.
 *
 * Order here does not matter: `getBooks` sorts by `finished`, so a new
 * book can be added anywhere in the array.
 */
const data: Book[] = [
  {
    title: 'Kafka on the Shore',
    author: 'Haruki Murakami',
    finished: '2022-01-04',
    rating: 5,
  },
  {
    title: 'The Paper Menagerie and Other Stories',
    author: 'Ken Liu',
    finished: '2022-01-04',
    rating: 5,
  },
  {
    title: 'Off Centre',
    author: 'Haresh Sharma',
    finished: '2022-01-04',
    rating: 3,
    note: 'Watched the play live',
  },
  {
    title: 'The Joy Luck Club',
    author: 'Amy Tan',
    finished: '2022-01-04',
    rating: 4,
  },
  {
    title: 'The Art of Thinking Clearly',
    author: 'Rolf Dobelli',
    finished: '2022-01-04',
    rating: 5,
  },
  {
    title:
      'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    author: 'James Clear',
    finished: '2022-01-04',
    rating: 4,
  },
  {
    title:
      'Rich Dad Poor Dad: What the Rich Teach Their Kids About Money—That the Poor and Middle Class Do Not!',
    author: 'Robert T. Kiyosaki',
    finished: '2022-01-04',
    rating: 4,
  },
  {
    title: '12 Rules for Life: An Antidote to Chaos',
    author: 'Jordan B. Peterson',
    finished: '2022-01-04',
    rating: 4,
  },
  {
    title:
      'The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness',
    author: 'Morgan Housel',
    finished: '2022-01-04',
    rating: 5,
  },
  {
    title: 'The Almanack of Naval Ravikant: A Guide to Wealth and Happiness',
    author: 'Eric Jorgenson',
    finished: '2022-01-04',
    rating: 5,
  },
  {
    title: 'Kim Jiyoung, Born 1982',
    author: 'Cho Nam-Joo',
    finished: '2022-06-17',
    rating: 5,
  },
  {
    title: 'The Mountain Is You: Transforming Self-Sabotage Into Self-Mastery',
    author: 'Brianna Wiest',
    finished: '2022-03-07',
    rating: 5,
  },
  {
    title: 'How to Win Friends & Influence People',
    author: 'Dale Carnegie',
    finished: '2022-12-21',
    rating: 4,
  },
  {
    title:
      'Make Your Bed: Little Things That Can Change Your Life...And Maybe the World',
    author: 'William H. McRaven',
    finished: '2022-12-11',
    rating: 5,
  },
  {
    title: "Can't Hurt Me: Master Your Mind and Defy the Odds",
    author: 'David Goggins',
    finished: '2022-12-11',
    rating: 5,
  },
  {
    title: 'The Old Man of the Moon',
    author: 'Shen Fu',
    finished: '2022-08-17',
    rating: 4,
  },
  {
    title: 'The Winter War',
    author: 'Philip Teir',
    finished: '2022-08-17',
    rating: 4,
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    finished: '2023-02-17',
    rating: 5,
  },
  {
    title:
      'Never Split the Difference: Negotiating As If Your Life Depended On It',
    author: 'Chris Voss',
    finished: '2023-02-17',
    rating: 3,
  },
  {
    title:
      'Bitcoin Billionaires: A True Story of Genius, Betrayal, and Redemption',
    author: 'Ben Mezrich',
    finished: '2023-01-23',
    rating: 4,
  },
  {
    title:
      "Insane Mode: How Elon Musk's Tesla Sparked an Electric Revolution to End the Age of Oil",
    author: 'Hamish McKenzie',
    finished: '2022-12-28',
    rating: 4,
  },
  {
    title: 'How To Sell Your Way Through Life',
    author: 'Napoleon Hill',
    finished: '2022-12-23',
    rating: 4,
  },
  {
    title: 'Flowers for Algernon',
    author: 'Daniel Keyes',
    finished: '2023-08-23',
    rating: 5,
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    finished: '2023-07-14',
    rating: 4,
  },
  {
    title: 'A Tale for the Time Being',
    author: 'Ruth Ozeki',
    finished: '2023-05-19',
    rating: 4,
  },
  {
    title: "Chip War: The Fight for the World's Most Critical Technology",
    author: 'Chris Miller',
    finished: '2023-04-19',
    rating: 5,
  },
  {
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    finished: '2023-04-15',
    rating: 5,
  },
  {
    title:
      'Prisoners of Geography: Ten Maps That Tell You Everything You Need to Know About Global Politics',
    author: 'Tim Marshall',
    finished: '2023-11-12',
    rating: 2,
  },
  {
    title: 'Stay True',
    author: 'Hua Hsu',
    finished: '2023-10-28',
    rating: 4,
  },
  {
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    finished: '2023-10-22',
    rating: 5,
  },
  {
    title: "Influence Empire: The Story of Tencent and China's Tech Ambition",
    author: 'Lulu Yilun Chen',
    finished: '2023-10-01',
    rating: 4,
  },
  {
    title: 'Days at the Morisaki Bookshop',
    author: 'Satoshi Yagisawa',
    finished: '2023-09-22',
    rating: 3,
  },
  {
    title: 'The Corpse Walker: Real Life Stories, China from the Bottom Up',
    author: 'Liao Yiwu',
    finished: '2024-05-15',
    rating: 3,
  },
  {
    title: 'Same as Ever: A Guide to What Never Changes',
    author: 'Morgan Housel',
    finished: '2024-01-14',
    rating: 4,
  },
  {
    title: 'Principles: Life and Work',
    author: 'Ray Dalio',
    finished: '2024-01-14',
    rating: 4,
  },
  {
    title:
      'The Daily Stoic: 366 Meditations on Wisdom, Perseverance, and the Art of Living',
    author: 'Ryan Holiday',
    finished: '2024-01-14',
    rating: 4,
  },
  {
    title: 'Normal People',
    author: 'Sally Rooney',
    finished: '2024-01-01',
    rating: 2,
  },
  {
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    finished: '2023-12-09',
    rating: 4,
  },
  {
    title:
      "Tuesdays with Morrie: An Old Man, a Young Man, and Life's Greatest Lesson",
    author: 'Mitch Albom',
    finished: '2025-03-28',
    rating: 5,
  },
  {
    title: "Sir Thomas More's Utopia",
    author: 'Thomas More',
    finished: '2024-09-21',
    rating: 3,
  },
  {
    title:
      'Easy Money: Cryptocurrency, Casino Capitalism, and the Golden Age of Fraud: The Basis for the Documentary Everyone Is Lying to You for Money',
    author: 'Ben McKenzie',
    finished: '2024-09-04',
    rating: 2,
  },
  {
    title: 'LeBron',
    author: 'Jeff Benedict',
    finished: '2024-07-29',
    rating: 5,
  },
  {
    title: 'The Girl on the Train',
    author: 'Paula Hawkins',
    finished: '2024-07-28',
    rating: 2,
  },
  {
    title: 'A Little History of Economics',
    author: 'Niall Kishtainy',
    finished: '2025-12-07',
    rating: 5,
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    finished: '2025-11-22',
    rating: 5,
  },
  {
    title: 'The Big Short: Inside the Doomsday Machine',
    author: 'Michael Lewis',
    finished: '2025-10-21',
    rating: 4,
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    finished: '2025-10-16',
    rating: 5,
  },
  {
    title: 'Start with Why: How Great Leaders Inspire Everyone to Take Action',
    author: 'Simon Sinek',
    finished: '2025-08-17',
    rating: 4,
  },
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    finished: '2025-06-12',
    rating: 5,
  },
  {
    title:
      "The Thinking Machine: Jensen Huang, Nvidia, and the World's Most Coveted Microchip",
    author: 'Stephen Richard Witt',
    finished: '2026-01-21',
    rating: 5,
  },
  {
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    finished: '2026-01-02',
    rating: 5,
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    finished: '2025-12-22',
    rating: 4,
  },
];

export default data;
