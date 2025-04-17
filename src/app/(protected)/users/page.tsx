import { Suspense } from "react"
import type { Metadata } from "next"
import { DataTable } from "@/components/datatable/data-table"
import { columns } from "@/features/users/columns"
import { getUsersWithPagination } from "@/actions/user.action"

export const metadata: Metadata = {
  title: "Users",
  description: "User management dashboard with advanced data table",
}

interface UsersPageProps {
  searchParams: {
    page?: string
    per_page?: string
    sort?: string
    role?: string[]
    gender?: string[]
    profileCompleted?: string[]
    search?: string
  }
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Users</h1>
      <Suspense fallback={<div>Loading users...</div>}>
        <UsersTable searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

async function UsersTable({ searchParams }: UsersPageProps) {
  // Parse search params
  const params = await searchParams
  const page = Number(params.page) || 1
  const perPage = Number(params.per_page) || 10
  const sort = params.sort
  const search = params.search

  // Get filter values
  const roleFilter = Array.isArray(params.role) ? params.role : params.role ? [params.role] : []
  const genderFilter = Array.isArray(params.gender) ? params.gender : params.gender ? [params.gender] : []
  const profileCompletedFilter = Array.isArray(params.profileCompleted) ? params.profileCompleted : params.profileCompleted ? [params.profileCompleted] : []

  // Fetch data with pagination, sorting, and filtering
  const data = await getUsersWithPagination({
    page,
    perPage,
    sort,
    search,
    filters: {
      role: roleFilter,
      gender: genderFilter,
      profileCompleted: profileCompletedFilter,
    },
  })

  if (!data.success) {
    return <div>Error: {data.error}</div>
  }

  const { users, totalUsers } = (data as { success: true; data: { users: any[]; totalUsers: number } }).data

  const filterableColumns = [
    {
      id: "role",
      title: "Role",
      options: [
        { label: "Admin", value: "ADMIN" },
        { label: "User", value: "USER" },
      ],
    },
    {
      id: "gender",
      title: "Gender",
      options: [
        { label: "Male", value: "MALE" },
        { label: "Female", value: "FEMALE" },
      ],
    },
    {
      id: "profileCompleted",
      title: "Profile Status",
      options: [
        { label: "Completed", value: "true" },
        { label: "Incomplete", value: "false" },
      ],
    },
  ]

  const searchableColumns = [
    {
      id: "name",
      title: "name",
    },
    {
      id: "email",
      title: "email",
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={users}
      filterableColumns={filterableColumns}
      searchableColumns={searchableColumns}
      totalItems={totalUsers}
      pageCount={Math.ceil(totalUsers / perPage)}
      defaultPageSize={perPage}
    />
  )
}
