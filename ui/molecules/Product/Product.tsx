import styles from '../../../styles/product.module.scss';

type Props = {
  title: string;
  image: string;
  price: string;
  tags: string[] | null;
  colors: {
    name: string
  }[] | null;
}

export const Product = ({title, image, price, tags, colors}: Props) => {
  return (
    <div className={styles.product}>
      <h6 className={styles['product--title']}>{title}</h6>
      <img src={image} alt={title} className="product--image"/>
      <span className="product--price">{price}$</span>
      <span className="product--price">{tags?.join(", ")}</span>
      <span className="product--price">{colors?.map((color) => color.name)}</span>
    </div>
  )
}