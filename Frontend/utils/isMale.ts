
export default function isMale(middleName: string | undefined){
    if (!middleName){
        return false;
    }

    const maleSuffixes = ['ович', 'йович'];

    for (const suffix of maleSuffixes) {
        if (middleName.endsWith(suffix)) {
            return true;
        }
    }

    const exceptions = [
        'Савич',
        'Ілліч',
        'Яковлевич',
        'Лукич',
    ];

    return exceptions.includes(middleName);
}
