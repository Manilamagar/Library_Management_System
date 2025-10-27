import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/*
    Home.jsx
    Simple, self-contained Home page for an Online Library Management System.
    - Fetches books from /api/books (expects JSON array)
    - Search, filter by category, sort, and simple pagination
    - "Borrow" action sends POST to /api/books/:id/borrow (optimistic UI)
    - Minimal styling via inline styles for quick drop-in
*/

const styles = {
    container: { padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 1100, margin: "0 auto" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
    controls: { display: "flex", gap: 10, alignItems: "center" },
    input: { padding: 8, borderRadius: 4, border: "1px solid #ccc" },
    select: { padding: 8, borderRadius: 4, border: "1px solid #ccc" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 },
    card: { border: "1px solid #e0e0e0", borderRadius: 8, padding: 12, background: "#fff", display: "flex", flexDirection: "column", gap: 8, height: "100%" },
    cover: { height: 140, background: "#f6f6f6", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#777", fontSize: 14 },
    title: { fontWeight: 600, fontSize: 16 },
    meta: { color: "#666", fontSize: 13 },
    actions: { marginTop: "auto", display: "flex", gap: 8 },
    btn: { padding: "8px 10px", borderRadius: 6, border: "none", cursor: "pointer" },
    primaryBtn: { background: "#1976d2", color: "#fff" },
    ghostBtn: { background: "#f5f5f5", color: "#333" },
    footer: { display: "flex", justifyContent: "center", gap: 8, marginTop: 18 },
};

function BookCard({ book, onBorrow }) {
    const available = book.copiesAvailable > 0;
    return (
        <div style={styles.card}>
            <div style={styles.cover}>
                {book.coverUrl ? <img src={book.coverUrl} alt={book.title} style={{ maxHeight: "100%", maxWidth: "100%", borderRadius: 4 }} /> : "No cover"}
            </div>
            <div style={styles.title}>{book.title}</div>
            <div style={styles.meta}>{book.author}</div>
            <div style={styles.meta}>Category: {book.category}</div>
            <div style={styles.meta}>Available: {book.copiesAvailable}</div>
            <div style={styles.actions}>
                <Link to={`/books/${book.id}`} style={{ textDecoration: "none" }}>
                    <button style={{ ...styles.btn, ...styles.ghostBtn }}>Details</button>
                </Link>
                <button
                    style={{ ...styles.btn, ...styles.primaryBtn }}
                    onClick={() => onBorrow(book.id)}
                    disabled={!available}
                    title={available ? "Borrow book" : "Not available"}
                >
                    {available ? "Borrow" : "Unavailable"}
                </button>
            </div>
        </div>
    );
}

export default function Home() {
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("title-asc");
    const [page, setPage] = useState(1);
    const perPage = 12;

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        fetch("/api/books")
            .then((r) => {
                if (!r.ok) throw new Error("Failed to fetch books");
                return r.json();
            })
            .then((data) => {
                if (!mounted) return;
                // ensure each book has expected fields
                const normalized = (data || []).map((b, i) => ({
                    id: b.id ?? b._id ?? i,
                    title: b.title ?? "Untitled",
                    author: b.author ?? "Unknown",
                    category: b.category ?? "General",
                    copiesAvailable: typeof b.copiesAvailable === "number" ? b.copiesAvailable : b.copies ?? 0,
                    coverUrl: b.coverUrl ?? b.image ?? "",
                }));
                setAllBooks(normalized);
                setLoading(false);
            })
            .catch((err) => {
                if (!mounted) return;
                setError(err.message || "Failed to load");
                setLoading(false);
            });

        return () => (mounted = false);
    }, []);

    // derive categories
    const categories = ["all", ...Array.from(new Set(allBooks.map((b) => b.category))).filter(Boolean)];

    // filter, search, sort
    useEffect(() => {
        let result = allBooks.slice();

        if (category !== "all") result = result.filter((b) => b.category === category);

        if (query.trim()) {
            const q = query.toLowerCase();
            result = result.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
        }

        if (sort === "title-asc") result.sort((a, b) => a.title.localeCompare(b.title));
        if (sort === "title-desc") result.sort((a, b) => b.title.localeCompare(a.title));
        if (sort === "author-asc") result.sort((a, b) => a.author.localeCompare(b.author));
        if (sort === "author-desc") result.sort((a, b) => b.author.localeCompare(a.author));

        setPage(1);
        setBooks(result);
    }, [allBooks, query, category, sort]);

    const totalPages = Math.max(1, Math.ceil(books.length / perPage));
    const current = books.slice((page - 1) * perPage, page * perPage);

    function handleBorrow(bookId) {
        // optimistic update
        setAllBooks((prev) =>
            prev.map((b) => (b.id === bookId ? { ...b, copiesAvailable: Math.max(0, (b.copiesAvailable || 0) - 1) } : b))
        );

        fetch(`/api/books/${bookId}/borrow`, { method: "POST" })
            .then((r) => {
                if (!r.ok) throw new Error("Borrow failed");
                // optionally re-fetch single book or ignore
            })
            .catch((err) => {
                // rollback on error
                setAllBooks((prev) =>
                    prev.map((b) => (b.id === bookId ? { ...b, copiesAvailable: (b.copiesAvailable ?? 0) + 1 } : b))
                );
                alert("Failed to borrow book: " + (err.message || "Unknown"));
            });
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={{ margin: 0 }}>Online Library</h2>
                <div style={styles.controls}>
                    <input
                        aria-label="Search books"
                        placeholder="Search by title or author..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ ...styles.input, width: 260 }}
                    />
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c === "all" ? "All categories" : c}
                            </option>
                        ))}
                    </select>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select}>
                        <option value="title-asc">Title ↑</option>
                        <option value="title-desc">Title ↓</option>
                        <option value="author-asc">Author ↑</option>
                        <option value="author-desc">Author ↓</option>
                    </select>
                    <Link to="/books/new">
                        <button style={{ ...styles.btn, ...styles.primaryBtn }}>Add Book</button>
                    </Link>
                </div>
            </div>

            {loading ? (
                <div>Loading books...</div>
            ) : error ? (
                <div style={{ color: "red" }}>Error: {error}</div>
            ) : books.length === 0 ? (
                <div>No books found.</div>
            ) : (
                <>
                    <div style={styles.grid}>
                        {current.map((book) => (
                            <BookCard key={book.id} book={book} onBorrow={handleBorrow} />
                        ))}
                    </div>

                    <div style={styles.footer}>
                        <button
                            style={{ ...styles.btn, ...styles.ghostBtn }}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page <= 1}
                        >
                            Prev
                        </button>
                        <div style={{ padding: "8px 12px", alignSelf: "center" }}>
                            Page {page} / {totalPages}
                        </div>
                        <button
                            style={{ ...styles.btn, ...styles.ghostBtn }}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page >= totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
export 