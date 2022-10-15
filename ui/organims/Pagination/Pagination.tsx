import styles from '../../../styles/pagination.module.scss'

interface Props {
  productsPerPage: number;
  totalProducts: number;
  paginate: (page: number) => void;
  currentPage: number;
}

export const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }: Props) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalProducts/productsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map((page) => (
          <li key={page} onClick={() => paginate(page)} className={page === currentPage ? styles.active: ''}>
            {page}
          </li>
        ))}
      </ul>
    </nav>
  )
}