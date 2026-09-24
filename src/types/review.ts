/**
 * 代码深度检视（Code Deep Review）相关类型
 * 字段名以现有页面占位为准，后端接口定义确认后按需调整
 */

/** 深度检视任务状态：Running=进行中，Released=已发布（可下载产物） */
export type ReviewStatus = 'Running' | 'Released'

/** 深度检视任务列表项 */
export interface ReviewTaskItem {
  taskId: string
  status: ReviewStatus
  /** 创建时间 */
  createdAt: string
}

/** 查询任务列表参数（服务 A） */
export interface ReviewTaskListParams {
  /** 按 TaskID 筛选 */
  taskId?: string
  /** 按状态筛选 */
  status?: ReviewStatus
  /** 页码，从 1 开始 */
  page: number
  /** 每页条数 */
  pageSize: number
}

/** 查询任务列表结果（服务 A） */
export interface ReviewTaskListResult {
  items: ReviewTaskItem[]
  total: number
}
