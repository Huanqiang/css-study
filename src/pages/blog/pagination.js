import React from 'react'
import { Pagination } from 'antd'

export default ({ total, onChange, pageSize }) => {
  return (
    <div className="blog-main-pagination">
      <Pagination size="small" total={total} onChange={onChange} pageSize={pageSize} />
    </div>
  )
}
