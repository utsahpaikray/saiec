type Satisfaction = 'happy' | 'neutral' | 'sad'

export interface CustomerSatisfaction {
  iconKey: Satisfaction
  textColor: string
  translationKey: string
}
