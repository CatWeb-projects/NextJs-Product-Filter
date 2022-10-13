import {useState, useEffect} from 'react';
import data from '../miista-export.json';
import { Layout } from '../ui/templates';

import styles from '../styles/products.module.scss'

const Products = () => {
  const [priceFrom, setPriceFrom] = useState<number>(0);
  const [priceTo, setPriceTo] = useState<number>(0);
  const [colors, setColors] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);

  useEffect(() => {}, []);

  console.log(data, 'data');

  const selectColors = (e: React.ChangeEvent<HTMLSelectElement>) => {
   
  }

  const selectTags = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
  }

  return (
    <Layout>
      <div className={styles.products}>
        <div className="">
          <h6 className={styles['filter-title']}>By Price</h6>
          <form>
            <input placeholder="from" value={priceFrom}
              onChange={(e) => setPriceFrom(Number(e.target.value))} className={styles.input} />
            <input placeholder="to" value={priceTo}
              onChange={(e) => setPriceTo(Number(e.target.value))} className={styles.input} />
          </form>
        </div>
        <div className="filter">
          <p className="filter-title">By Color</p>
          <select multiple value={selectedColor} className="select" onChange={selectColors}>
            <option value="Default" disabled>Select a color</option>
            {colors.sort().map((color, i)=> (
              <option key={i} value={color}>{color}</option>
            ))}
          </select>
        </div>
        <div className="filter-side_by-tags filter">
          <p className="filter-title">By Tags</p>
          <select multiple value={selectedTag} className="select" onChange={selectTags}>
            <option value="Default" disabled>Select a tag</option>
            {tags.sort().map((tag, i)=> (
              <option key={i} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        <button type="button" className="btn">
          Filter
        </button>
      </div>
    </Layout>
  )
}

export default Products;
