import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Autocomplete } from "@react-google-maps/api";

interface PropertyFormProps {
  onSubmit: (formData: {
    title: string;
    description: string;
    price: string;
    location: string;
    imageFile: File | null;
  }) => Promise<void>;
  googleMapsLoaded: boolean;
  onPlaceSelect: (place: google.maps.places.Autocomplete) => void;
}

export const PropertyForm = ({ onSubmit, googleMapsLoaded, onPlaceSelect }: PropertyFormProps) => {
  const [propertyTitle, setPropertyTitle] = useState("");
  const [propertyDescription, setPropertyDescription] = useState("");
  const [propertyPrice, setPropertyPrice] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      title: propertyTitle,
      description: propertyDescription,
      price: propertyPrice,
      location: propertyLocation,
      imageFile,
    });
    // Reset form
    setPropertyTitle("");
    setPropertyDescription("");
    setPropertyPrice("");
    setPropertyLocation("");
    setImageFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="space-y-2">
        <Label htmlFor="propertyTitle">Property Title</Label>
        <Input
          id="propertyTitle"
          value={propertyTitle}
          onChange={(e) => setPropertyTitle(e.target.value)}
          placeholder="Enter property title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyDescription">Description</Label>
        <Textarea
          id="propertyDescription"
          value={propertyDescription}
          onChange={(e) => setPropertyDescription(e.target.value)}
          placeholder="Describe your property"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyPrice">Price per Month</Label>
        <Input
          id="propertyPrice"
          type="number"
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(e.target.value)}
          placeholder="Enter price"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyLocation">Location</Label>
        {googleMapsLoaded ? (
          <Autocomplete onLoad={onPlaceSelect}>
            <Input
              id="propertyLocation"
              value={propertyLocation}
              onChange={(e) => setPropertyLocation(e.target.value)}
              placeholder="Enter location"
              required
            />
          </Autocomplete>
        ) : (
          <Input
            id="propertyLocation"
            value={propertyLocation}
            onChange={(e) => setPropertyLocation(e.target.value)}
            placeholder="Enter location"
            required
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyImage">Property Image</Label>
        <Input
          id="propertyImage"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          required
        />
      </div>

      <Button type="submit">List Property</Button>
    </form>
  );
};