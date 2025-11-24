import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Home.jsx
 * Home page for INC Pustakalaya (Library Management System)
 *
 * - Search books
 * - Quick stats
 * - Categories
 * - Featured books (horizontal scroll)
 * - Recent additions
 *
 * Replace mock data / API calls with real endpoints as needed.
 */

const styles = {
    container: {
        padding: "24px",
        fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        color: "#0f172a",
        maxWidth: 1100,
        margin: "0 auto",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        marginBottom: 18,
    },
    brand: { display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" },
    logo: { width: 48, height: 48, borderRadius: 8, background: "#0ea5a4", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 },
    search: { display: "flex", gap: 8, alignItems: "center", marginBottom: 18 },
    input: { flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb" },
    btnPrimary: { background: "#0ea5a4", color: "#fff", padding: "10px 14px", borderRadius: 8, border: "none", cursor: "pointer" },
    stats: { display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" },
    statCard: { background: "#fff", padding: 12, borderRadius: 8, boxShadow: "0 1px 2px rgba(15,23,42,0.05)", minWidth: 140, textAlign: "center" },
    sectionTitle: { display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0 12px" },
    categories: { display: "flex", gap: 10, flexWrap: "wrap" },
    category: { padding: "8px 12px", background: "#f8fafc", borderRadius: 999, cursor: "pointer", border: "1px solid #eef2f7" },
    featured: { display: "flex", gap: 12, overflowX: "auto", paddingBottom: 6 },
    bookCard: { minWidth: 140, background: "#fff", borderRadius: 8, padding: 10, boxShadow: "0 1px 2px rgba(15,23,42,0.05)", display: "flex", gap: 10 },
    bookCover: { width: 72, height: 100, objectFit: "cover", borderRadius: 4, background: "#f1f5f9" },
    recentList: { display: "grid", gridTemplateColumns: "1fr", gap: 10 },
    small: { color: "#64748b", fontSize: 13 },
};

export default function Home() {
    const [query, setQuery] = useState("");
    const [stats, setStats] = useState({ books: 0, members: 0, borrowed: 0 });
    const [categories, setCategories] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [recent, setRecent] = useState([]);

    useEffect(() => {
        // TODO: Replace with real API calls
        // fetch("/api/stats").then(...)

        // Mock data
        setStats({ books: 4382, members: 1290, borrowed: 312 });
        setCategories(["Fiction", "Non-fiction", "Science", "Technology", "Children", "History"]);
        setFeatured([
            { id: 1, title: "Intro to React", author: "A. Developer" },
            { id: 2, title: "Modern JS", author: "B. Coder" },
            { id: 3, title: "Design Patterns", author: "C. Architect" },
            { id: 4, title: "Clean Code", author: "D. Martin" },
        ]);
        setRecent([
            { id: 101, title: "New Age Libraries", author: "E. Researcher", date: "2025-11-15" },
            { id: 102, title: "Learning GraphQL", author: "F. Dev", date: "2025-11-10" },
            { id: 103, title: "Algorithm Essentials", author: "G. Algo", date: "2025-11-08" },
        ]);
    }, []);

    const onSearch = (e) => {
        e.preventDefault();
        // navigate to search results or call API
        console.log("Search:", query);
        // Example: history.push(`/search?q=${encodeURIComponent(query)}`)
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <Link to="/" style={styles.brand}>
                    <div style={styles.logo}>INC</div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 18 }}>Pustakalaya</div>
                        <div style={{ fontSize: 13, color: "#64748b" }}>Library Management System</div>
                    </div>
                </Link>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Link to="/catalog" style={{ textDecoration: "none" }}>
                        <button style={{ ...styles.btnPrimary, background: "#1e293b" }}>Browse Catalog</button>
                    </Link>
                    <Link to="/books/new" style={{ textDecoration: "none" }}>
                        <button style={styles.btnPrimary}>Add Book</button>
                    </Link>
                </div>
            </header>

            <form style={styles.search} onSubmit={onSearch}>
                <input
                    aria-label="Search books"
                    placeholder="Search by title, author, or ISBN..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.btnPrimary}>
                    Search
                </button>
            </form>

            <section style={styles.stats}>
                <div style={styles.statCard}>
                    <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.books.toLocaleString()}</div>
                    <div style={styles.small}>Books</div>
                </div>
                <div style={styles.statCard}>
                    <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.members.toLocaleString()}</div>
                    <div style={styles.small}>Members</div>
                </div>
                <div style={styles.statCard}>
                    <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.borrowed.toLocaleString()}</div>
                    <div style={styles.small}>Currently Borrowed</div>
                </div>
            </section>

            <section>
                <div style={styles.sectionTitle}>
                    <h3 style={{ margin: 0 }}>Categories</h3>
                    <Link to="/categories" style={{ fontSize: 13, color: "#0ea5a4" }}>
                        See all
                    </Link>
                </div>
                <div style={styles.categories}>
                    {categories.map((c) => (
                        <button key={c} style={styles.category} onClick={() => console.log("filter category", c)}>
                            {c}
                        </button>
                    ))}
                </div>
            </section>

            <section>
                <div style={styles.sectionTitle}>
                    <h3 style={{ margin: 0 }}>Featured Books</h3>
                    <Link to="/featured" style={{ fontSize: 13, color: "#0ea5a4" }}>
                        View more
                    </Link>
                </div>
                <div style={styles.featured}>
                    {featured.map((b) => (
                        <div key={b.id} style={styles.bookCard}>
                            <img
                                src={`https://via.placeholder.com/72x100?text=${encodeURIComponent(b.title.split(" ")[0])}`}
                                alt={`${b.title} cover`}
                                style={styles.bookCover}
                            />
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <div style={{ fontWeight: 700, fontSize: 14 }}>{b.title}</div>
                                <div style={styles.small}>{b.author}</div>
                                <Link to={`/books/${b.id}`} style={{ marginTop: 8, fontSize: 13, color: "#0ea5a4" }}>
                                    Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <div style={styles.sectionTitle}>
                    <h3 style={{ margin: 0 }}>Recent Additions</h3>
                    <Link to="/recent" style={{ fontSize: 13, color: "#0ea5a4" }}>
                        See all
                    </Link>
                </div>
                <div style={styles.recentList}>
                    {recent.map((r) => (
                        <div key={r.id} style={{ ...styles.statCard, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div style={{ fontWeight: 700 }}>{r.title}</div>
                                <div style={styles.small}>{r.author}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={styles.small}>{new Date(r.date).toLocaleDateString()}</div>
                                <Link to={`/books/${r.id}`} style={{ fontSize: 13, color: "#0ea5a4" }}>
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer style={{ marginTop: 28, textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
                INC Pustakalaya — empowering readers & managing collections
            </footer>
        </div>
    );
}