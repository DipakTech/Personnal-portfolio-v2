import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
// import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import { liteClient } from "algoliasearch/lite";

const searchClient = liteClient(
  "8VMZOQ9VO6",
  "5c08149cb94432a0e4dd12422eef94b0",
);

interface searchModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal = ({ isOpen, setIsOpen }: searchModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px]">
        {/* <InstantSearch searchClient={searchClient} indexName="YOUR_INDEX_NAME">
          <Command className="rounded-lg border shadow-md">
            <SearchBox placeholder="search posts" />
            <CommandList>
              <CommandGroup heading="Links">
                <Hits hitComponent={Hit} />
              </CommandGroup>
            </CommandList>
          </Command>
        </InstantSearch> */}
      </DialogContent>
    </Dialog>
  );
};

const Hit = ({ hit }: { hit: any }) => (
  <CommandItem>
    <span>{hit.title}</span>
  </CommandItem>
);

export default SearchModal;
