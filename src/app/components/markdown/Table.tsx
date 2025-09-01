// components/mdx/Table.tsx
export function Table(props: React.HTMLAttributes<HTMLTableElement>) {
    return (
        <table
            className="w-full rounded-lg  border border-gray-200 border-separate border-spacing-0"
            {...props}
        />
    );
}

export function THead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
    return <thead className="bg-transparent rounded-t-lg" {...props} />;
}

export function TBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
    return <tbody className="divide-y divide-gray-200" {...props} />;
}

export function TR(props: React.HTMLAttributes<HTMLTableRowElement>) {
    return <tr className="hover:bg-gray-50" {...props} />;
}

export function TH(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
    return (
        <th
            className="px-4 py-2 text-left  text-sm font-semibold text-gray-700 "
            {...props}
        />
    );
}

export function TD(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
    return (
        <td
            className="px-4 py-2 border-t border-gray-200 text-sm text-gray-600"
            {...props}
        />
    );
}