import { useSearchParams } from 'react-router';
import { booksTable } from '../db.ts';
import { useEffect, useState } from 'react';
import { BookGrid } from '../components/BookGrid.tsx';
import type { Book } from '../models/Book';

export default function Books() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search') ?? '';
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

    useEffect(() => {
        const response = booksTable.filter((book) =>
            book.title.toLowerCase().includes(query?.toLowerCase())
        );
        setFilteredBooks(response);
    }, [query]);

    return (
        <div className="flex items-center justify-between gap-4">
            {filteredBooks.length > 0 ? (
                <BookGrid books={filteredBooks} title={`Resultados de: ${query}`}/>
            ) : (
                <div className="flex items-center justify-center h-screen w-full">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">No se encontraron resultados</h2>
                    </div>
                </div>
            )}
        </div>
    );
}
