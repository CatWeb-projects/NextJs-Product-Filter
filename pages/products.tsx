import {useState, useEffect, useMemo} from 'react';
import products from '../miista-export.json';
import { Layout } from '../ui/templates';
import { Pagination } from '../ui/organims';
import { Product } from '../ui/molecules';

import styles from '../styles/products.module.scss'

interface ProductProps {
  node: {
    categoryTags: string[] | null;
    colorFamily: {
      name: string;
    }[] | null;
    name: string;
    node_locale: string;
    shopifyProductEu: {
      variants: {
        edges: {
          node: {
            price: string;
          }
        }[]
      }
    }
    thumbnailImage: {
      file: {
        url: string;
      }
    }
  }
}

const Products = () => {
  const [priceFrom, setPriceFrom] = useState<number>(0);
  const [priceTo, setPriceTo] = useState<number>(0);
  const [colors, setColors] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState<number>(10)
  const [list, setList] = useState<ProductProps[]>(products?.data?.allContentfulProductPage?.edges);

  const data = useMemo(() => list, [products])

  useEffect(() => {
    getColorsAndTags()
  }, []);

  const getColorsAndTags = () => {
    //colors
    const filterColors: string[] = []
    const filterTags: string[] = []

    data.map((item) => {
      item?.node?.colorFamily?.map(color => {
        if(!filterColors.includes(color.name.trim())) {
          filterColors.push(color.name.trim())
          setColors(filterColors)
        }
      })
    })
    //tags
    data.map((item) => {
      item?.node?.categoryTags?.map(tag => {
        if(!filterTags.includes(tag.trim())) {
          filterTags.push(tag.trim())
          setTags(filterTags)
        }
      })
    })
  }


  const onSelectColors = (e: { target: {value: string}}) => {
    setSelectedColor(e.target.value)
  }

  const onSelectTags = (e: { target: {value: string}}) => {
    setSelectedTag(e.target.value);
  }

  const onFilter = () => {
    const byPrice = data.filter((product) => {
      const price = Number(product.node.shopifyProductEu.variants.edges[0].node.price);
      if (priceFrom && priceTo) {
        return price > priceFrom && price < priceTo
      } else if (priceFrom && !priceTo) {
        return (price > priceFrom && price < 10000)
      } else if (!priceFrom && priceTo) {
        return (price > 0 && price < priceTo)
      } else {
        return product
      }
    }).filter((product) => {
      if(product.node.colorFamily?.some(color => color.name.includes(selectedColor))) {
        return product;
      }
    }).filter((product) => product.node.categoryTags?.some((tag) => tag.includes(selectedTag)))
    setList(byPrice)
  }

  //pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = list.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (page: number) => {
    setCurrentPage(page)
  }

  console.log(list, 'data')


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
          <select value={selectedColor} className={styles.select} onChange={(e) => onSelectColors(e)}>
            <option value="">Select a color</option>
            {colors.sort().map((color, i)=> (
              <option key={i} value={color}>{color}</option>
            ))}
          </select>
        </div>
        <div className="filter">
          <p className="filter-title">By Tags</p>
          <select value={selectedTag} className={styles.select} onChange={(e) => onSelectTags(e)}>
            <option value="">Select a tag</option>
            {tags.sort().map((tag, i)=> (
              <option key={i} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        <button type="button" className={styles['filter-button']} onClick={onFilter}>
          Filter
        </button>
      </div>
      <div className={styles['products-wrapper']}>
        { currentProducts.map((product, i) => (
          <Product
            key={i}
            title={product.node.name}
            image={product.node.thumbnailImage.file.url}
            tags={product.node.categoryTags}
            colors={product.node.colorFamily}
            price={product.node.shopifyProductEu.variants.edges[0].node.price}
          />
        ))}
      </div>
      <Pagination 
        productsPerPage={productsPerPage} 
        totalProducts={list.length} 
        paginate={paginate}
        currentPage={currentPage}
      />
    </Layout>
  )
}

export default Products;
