import { PropertyAmenities } from "@/components/property/PropertyAmenities";
import { PropertyBookingCard } from "@/components/property/PropertyBookingCard";

interface PropertyDetailsSectionProps {
  description: string;
  price: number;
}

export const PropertyDetailsSection = ({ description, price }: PropertyDetailsSectionProps) => {
  return (
    <div className="grid grid-cols-3 gap-12 px-4 py-8">
      <div className="col-span-2">
        <div className="border-b pb-6">
          <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
        </div>

        <div className="py-6 border-b">
          <p className="text-gray-600">{description}</p>
        </div>

        <PropertyAmenities />
      </div>

      <div className="col-span-1">
        <PropertyBookingCard price={price} />
      </div>
    </div>
  );
};