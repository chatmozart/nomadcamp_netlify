import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface PropertyBookingCardProps {
  price: number;
  priceThreeMonths?: number;
  priceSixMonths?: number;
  priceOneYear?: number;
  availabilityStart?: string | null;
  availabilityEnd?: string | null;
  contactName?: string;
  contactEmail?: string;
  contactWhatsapp?: string;
}

export const PropertyBookingCard = ({ 
  price,
  priceThreeMonths,
  priceSixMonths,
  priceOneYear,
  availabilityStart,
  availabilityEnd,
  contactName,
  contactEmail,
  contactWhatsapp
}: PropertyBookingCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log('Rendering PropertyBookingCard with contact info:', { 
    contactName,
    contactEmail,
    contactWhatsapp
  });
  
  return (
    <div className="sticky top-24">
      <Card className="p-6 min-h-fit flex flex-col justify-between gap-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Price</h3>
            <div className="flex justify-between items-center">
              <span>Monthly rate (1 month contract)</span>
              <span className="text-2xl font-bold">{price.toLocaleString()}฿</span>
            </div>
            {priceThreeMonths && (
              <div className="flex justify-between items-center">
                <span>Monthly rate (3 month contract)</span>
                <span className="text-2xl font-bold">{Math.round(priceThreeMonths / 3).toLocaleString()}฿</span>
              </div>
            )}
            {priceSixMonths && (
              <div className="flex justify-between items-center">
                <span>Monthly rate (6 month contract)</span>
                <span className="text-2xl font-bold">{Math.round(priceSixMonths / 6).toLocaleString()}฿</span>
              </div>
            )}
            {priceOneYear && (
              <div className="flex justify-between items-center">
                <span>Monthly rate (12 month contract)</span>
                <span className="text-2xl font-bold">{Math.round(priceOneYear / 12).toLocaleString()}฿</span>
              </div>
            )}
          </div>
          
          {availabilityStart && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Availability</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Period</span>
                <span className="font-medium">
                  {new Date(availabilityStart).toLocaleDateString('en-GB', { 
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })} - {
                    availabilityEnd 
                      ? new Date(availabilityEnd).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })
                      : 'ongoing'
                  }
                </span>
              </div>
            </div>
          )}

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Book
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-4">
              <div className="space-y-4">
                {contactName && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Contact Name</span>
                    <span className="font-medium">{contactName}</span>
                  </div>
                )}
                {contactEmail && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium">{contactEmail}</span>
                  </div>
                )}
                {contactWhatsapp && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">WhatsApp</span>
                    <span className="font-medium">{contactWhatsapp}</span>
                  </div>
                )}
                {!contactName && !contactEmail && !contactWhatsapp && (
                  <p className="text-gray-500 text-center">No contact information available</p>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Card>
    </div>
  );
};