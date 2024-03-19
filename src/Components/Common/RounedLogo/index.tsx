export interface MLogoProps {
    logoUrl: string;
    className?: string;
    alt: string;
}
const MRoundedLogo: React.FC<MLogoProps> = ({
    logoUrl,
    className = "",
    alt,
}) => {
    return (
        <img
            className={`object-contain rounded-full ${className}`}
            src={logoUrl}
            alt={alt}
        />
    );
};

export default MRoundedLogo;
