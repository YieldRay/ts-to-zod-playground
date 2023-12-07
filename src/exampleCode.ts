export const exampleCode = `
// source.ts
export interface HeroContact {
  /**
   * The email of the hero.
   *
   * @format email
   */
  email: string;

  /**
   * The name of the hero.
   *
   * @minLength 2
   * @maxLength 50
   */
  name: string;

  /**
   * The phone number of the hero.
   *
   * @pattern ^([+]?d{1,2}[-s]?|)d{3}[-s]?d{3}[-s]?d{4}$
   */
  phoneNumber: string;

  /**
   * Does the hero has super power?
   *
   * @default true
   */
  hasSuperPower?: boolean;

  /**
   * The age of the hero
   *
   * @minimum 0
   * @maximum 500
   */
  age: number;
}

// output.ts
export const heroContactSchema = z.object({
  /**
   * The email of the hero.
   *
   * @format email
   */
  email: z.string().email(),

  /**
   * The name of the hero.
   *
   * @minLength 2
   * @maxLength 50
   */
  name: z.string().min(2).max(50),

  /**
   * The phone number of the hero.
   *
   * @pattern ^([+]?d{1,2}[-s]?|)d{3}[-s]?d{3}[-s]?d{4}$
   */
  phoneNumber: z.string().regex(/^([+]?d{1,2}[-s]?|)d{3}[-s]?d{3}[-s]?d{4}$/),

  /**
   * Does the hero has super power?
   *
   * @default true
   */
  hasSuperPower: z.boolean().default(true),

  /**
   * The age of the hero
   *
   * @minimum 0
   * @maximum 500
   */
  age: z.number().min(0).max(500),
});
`.trim()
