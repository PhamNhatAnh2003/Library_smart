import React, { useMemo, useState, useEffect } from "react";
import styles from "./BookList.module.scss";
import Card from "../../../components/Card";
import {getBookByName} from "@/services/bookServices/bookService.js"


const BooksList = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("title_asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const ITEMS_PER_PAGE = 6;

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const filters = {
        name: query,
        author: author,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      };
      const data = await getBookByName(filters);
      setBooks(data?.data || []); 
      console.log(data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBooks();
  }, []);


  // Lọc sách
const filtered = useMemo(() => {
  if (!Array.isArray(books)) return [];

  return books
    .filter((book) => {
      const matchName = book.title?.toLowerCase().includes(query.toLowerCase());
      const matchauthor = book.author?.toLowerCase().includes(author.toLowerCase());

      let matchPrice = true;
      const price = book.price;

      if (minPrice && price < Number(minPrice)) matchPrice = false;
      if (maxPrice && price > Number(maxPrice)) matchPrice = false;

      return matchName && matchPrice && matchauthor;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "title_desc":
          return b.title.localeCompare(a.title);
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
}, [books, query, author , minPrice, maxPrice, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleResetFilters = () => {
    setQuery("");
    setAuthor("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("title_asc");
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Danh sách sách</h1>
        <p className={styles.subtitle}>
          Tìm & lọc sách theo tên, giá hoặc khoảng giá.
        </p>
      </header>

      <section className={styles.layout}>
        {/* Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <label>Tìm theo tên</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nhập tên sách..."
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Khoảng giá (VND)</label>
            <div className={styles.priceRange}>
              <input
                type="number"
                min={0}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Từ"
              />
              <input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Đến"
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Tìm theo tên tác giả</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Nhập tên tác giả..."
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Sắp xếp</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="title_asc">Tên A → Z</option>
              <option value="title_desc">Tên Z → A</option>
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button onClick={handleResetFilters}>Đặt lại</button>
            <button onClick={() => setCurrentPage(1)}>Áp dụng</button>
          </div>
        </aside>

        {/* Results */}
        <main className={styles.results}>
          <div className={styles.resultsInfo}>
            <span>
              Tìm thấy <strong>{filtered.length}</strong> kết quả
            </span>
            <span>
              Trang {currentPage} / {totalPages}
            </span>
          </div>

          <div className={styles.grid}>
            {paginated.map((book) => (
              <Card key={book.id} book={book} />
            ))}
          </div>

          <nav className={styles.pagination}>
            <div>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Trước
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Sau
              </button>
            </div>
            <span>
              Hiển thị {paginated.length} / {filtered.length}
            </span>
          </nav>
        </main>
      </section>
    </div>
  );
};

export default BooksList;
