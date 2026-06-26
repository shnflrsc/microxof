export function createSuffix(firstName: string, lastName: string, middleName?: string | null): string {
    const getInitials = (name: string | null | undefined): string => {
        if (!name) return '';
        
        return name
            .trim()
            .split(/\s+/)
            .map(part => part.charAt(0).toUpperCase())
            .join('');
    };

    const firstInitials = getInitials(firstName);
    const middleInitials = getInitials(middleName);
    const lastInitials = getInitials(lastName);

    return `${firstInitials}${middleInitials}${lastInitials}`;
}