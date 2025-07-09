type FlowData = {
  picto: string,
  step: 'fabrication' | 'sowing' | 'replant' | 'fertilization' | 'harvest' | 'recycling',
  name: string,
  variety: string,
  dateEvent: Date
}
