import { FC } from 'react'
import Select, { SelectProps } from './Select'
import Option, { OptionProps } from './Option'

export type ISelectProps = FC<SelectProps> & {
  Option: FC<OptionProps>
}
const TransSelect = Select as ISelectProps

TransSelect.Option = Option

export default TransSelect
