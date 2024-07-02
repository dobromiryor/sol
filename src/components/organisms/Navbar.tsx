import clsx from "clsx";
import { useCombobox } from "downshift";
import { useCallback, useEffect, useState } from "react";
import { GeolocationStatus } from "../../enums/geolocation-status.enum";
import { useDebounce } from "../../hooks/useDebounce";
import { useGeocoding } from "../../hooks/useGeocoding";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useReverseGeocoding } from "../../hooks/useReverseGeocoding";
import { useGeocodeStore } from "../../stores/geocoding.store";
import { useWeatherStore } from "../../stores/weather.store";
import { Geocoding } from "../../types/geolocations.type";
import { IconType } from "../../types/icon.type";
import { Icon } from "../atoms/Icon";
import { SettingsModal } from "../molecules/SettingsModal";

const itemToString = (item: Geocoding | undefined | null) => {
  if (!item) {
    return "";
  }

  if (item.state) {
    return `${item.name}, ${item.state}, ${item.country}`;
  }

  return `${item.name}, ${item.country}`;
};

export const Navbar = () => {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<Geocoding | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLocal, setIsLocal } = useWeatherStore();
  const { geocode, setGeocode } = useGeocodeStore();

  const { debouncedValue: debouncedSearch } = useDebounce({ value: search });
  const { coords, status } = useGeolocation();

  const {
    data: geocodingData,
    isLoading,
    isValidating,
  } = useGeocoding({
    q: (debouncedSearch !== itemToString(geocode)
      ? debouncedSearch
      : undefined) as string | undefined,
  });
  const { data: reverseGeocodingData } = useReverseGeocoding({ coords });

  const getLocationIcon = useCallback(
    (status: GeolocationStatus | undefined): IconType => {
      if (isLocal) {
        return "person_pin_circle";
      }

      switch (status) {
        case GeolocationStatus.UNAVAILABLE:
          return "fmd_bad";
        case GeolocationStatus.DENIED:
        case GeolocationStatus.TIMEOUT:
          return "location_off";
        case GeolocationStatus.IN_PROGRESS:
          return "not_listed_location";
        case GeolocationStatus.SUCCESS:
          return "location_on";
        default:
          return "not_listed_location";
      }
    },
    [isLocal]
  );

  const {
    isOpen,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    inputValue: search,
    items: geocodingData ?? [],
    onInputValueChange: ({ inputValue }) => setSearch(inputValue),
    itemToString,
    onSelectedItemChange: ({ selectedItem }) => {
      setSelectedItem(selectedItem);
      setGeocode(selectedItem);
      setIsLocal(false);
    },
    selectedItem,
  });

  useEffect(() => {
    setSelectedItem((isLocal ? reverseGeocodingData?.[0] : geocode) ?? null);
  }, [geocode, isLocal, reverseGeocodingData]);

  return (
    <div className="relative z-10">
      <div
        className={clsx(
          "px-3 py-1.5 flex gap-1.5 items-center bg-primary text-inverted-text dark:text-text rounded-full transition-all duration-300",
          isOpen ? "shadow-lg -translate-y-2" : "shadow translate-y-0"
        )}
      >
        <button
          disabled={isLocal || status !== GeolocationStatus.SUCCESS}
          onClick={() => setIsLocal(true)}
          className="flex justify-center items-center w-7 aspect-square"
        >
          <Icon icon={getLocationIcon(status)} size="20" />
        </button>
        <input
          className="px-1.5 bg-transparent text-lg w-full rounded-full"
          placeholder={itemToString(selectedItem)}
          {...getInputProps({
            onFocus: () => (isLocal ? setSearch("") : null),
          })}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center items-center w-7 aspect-square"
        >
          <Icon icon="settings" size="20" />
        </button>
      </div>
      <ul
        className={clsx(
          "absolute left-0 top-full w-full px-3 pt-6 pb-3 flex flex-col gap-1 bg-primary text-inverted-text dark:text-text rounded-b-[20px] transition-all duration-300 origin-top -z-10 shadow",
          isOpen
            ? "-translate-y-7 scale-y-100 shadow"
            : "-translate-y-5 scale-y-0 shadow-none"
        )}
        {...getMenuProps()}
      >
        {isLoading || isValidating ? (
          <>
            <li className="bg-accent h-6 w-11 my-1.5 mx-2 rounded-xl animate-pulse" />
            <li className="bg-accent h-6 w-64 my-1.5 mx-2 rounded-xl animate-pulse" />
            <li className="bg-accent h-6 w-20 my-1.5 mx-2 rounded-xl animate-pulse" />
          </>
        ) : geocodingData && geocodingData.length > 0 ? (
          geocodingData?.map((item, index) => (
            <li
              className={clsx(
                "py-1.5 px-2 rounded-xl cursor-pointer",
                highlightedIndex === index && "bg-accent",
                selectedItem === item && "bg-secondary"
              )}
              key={`Location__Item__${item.lat}__${item.lon}__${item.name}__${item.country}`}
              {...getItemProps({
                item,
              })}
            >
              {itemToString(item)}
            </li>
          ))
        ) : (
          <span className="self-center">
            No results. Try entering a city name.
          </span>
        )}
      </ul>
      <SettingsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};
