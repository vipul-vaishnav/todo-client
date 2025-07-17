import React from 'react'
import { Badge } from '../ui/badge'

type CustomBadgeProps = {
  priority: 'critical' | 'blocked' | 'high' | 'medium' | 'low'
}

const labelMap: Record<CustomBadgeProps['priority'], string> = {
  critical: 'Critical',
  low: 'Low',
  blocked: 'Blocked',
  high: 'High',
  medium: 'Medium'
}

const getStatusColor = (status: CustomBadgeProps['priority']) => {
  switch (status) {
    case 'high':
      return 'bg-[#FFF3D6] text-[#85640B] border-[#FFF3D6]'
    case 'medium':
      return 'bg-[#E2E8F0] text-[#475569] border-[#E2E8F0]'
    case 'low':
      return 'bg-[#D3F2E3] text-[#0A6E3D] border-[#D3F2E3]'
    case 'critical':
      return 'bg-[#FFE1DE] text-[#C22219] border-[#FFE1DE]'
    case 'blocked':
      return 'bg-[#000] text-[#fff] border-[#000]'
  }
}

const CustomBadge: React.FC<CustomBadgeProps> = (props) => {
  const { priority } = props
  return <Badge className={`${getStatusColor(priority)} rounded-full`}>{labelMap[priority]}</Badge>
}

export default CustomBadge
