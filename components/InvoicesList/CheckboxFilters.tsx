import { CheckboxSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { settingsAppState } from "@/atoms/settingsAppAtom";
import { ChangeEvent, FormEvent, FormEventHandler } from "react";
import { useRecoilState } from "recoil";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
const items = [
  {
    id: "draft",
    label: "draft",
  },
  {
    id: "pending",
    label: "pending",
  },
  {
    id: "paid",
    label: "paid",
  },
];
type FilterType = "draft" | "pending" | "paid";
export function FilterCheckbox({ label }: { label: FilterType }) {
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const toggleCheckbox = (checked: CheckedState) => {
    console.log(settingsState.filtersArray);
    if (checked) {
    }
    // setSettingsState((prev) => ({
    //   ...prev,
    //   filtersActivated: prev.filtersActivated.map((item) =>
    //     item.name === label ? { ...item, isActive: checked as boolean } : item
    //   ),
    // }));
  };
  return (
    <label className="flex items-center cursor-pointer" htmlFor={label}>
      <p
        className={cn("text-headingS first-letter:uppercase", {
          "text-white": settingsState.isDarkMode,
          "text-08": !settingsState.isDarkMode,
        })}
      >
        {label}
      </p>

      <Checkbox
        // className="peer hidden"
        id={label}
        // onCheckedChange={toggleCheckbox}
        // checked={true}
      />
      <span
        className={cn(
          "w-4 aspect-square rounded-sm mr-3 bg-03 block peer-checked:bg-01 peer-checked:bg-checkbox-checked bg-no-repeat bg-center order-first border-[1px] border-transparent peer-hover:border-01",
          {
            "bg-03": settingsState.isDarkMode,
            "bg-05": !settingsState.isDarkMode,
          }
        )}
      ></span>
    </label>
    // <div className="items-top flex space-x-2">
    //   <Checkbox id={label} />
    //   <div className="grid gap-1.5 leading-none">
    //     <label
    //       htmlFor={label}
    //       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //     >
    //       Accept terms and conditions
    //     </label>
    //     <p className="text-sm text-muted-foreground">
    //       You agree to our Terms of Service and Privacy Policy.
    //     </p>
    //   </div>
    // </div>
  );
}

export default function CheckboxFilters() {
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const toggleCheckbox = (e: ChangeEvent<HTMLInputElement>, label: string) => {
    setSettingsState((prev) => ({
      ...prev,
      filtersActivated: prev.filtersActivated.map((item) =>
        item.name === label ? { ...item, isActive: e.target.checked } : item
      ),
    }));
  };
  const form = useForm<z.infer<typeof CheckboxSchema>>({
    resolver: zodResolver(CheckboxSchema),
    defaultValues: {
      items: ["draft", "pending", "paid"],
    },
  });
  function onSubmit(data: z.infer<typeof CheckboxSchema>) {
    console.log(data);
  }
  function onChange(e: FormEvent<HTMLFormElement>) {
    console.log(form.getValues());
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              console.log(checked, "checked");
                              console.log(field, "field");

                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                            // onCheckedChange={(checked) => {
                            //   return checked
                            //     ? field.onChange([...field.value, item.id])
                            //     : field.onChange(
                            //         field.value?.filter(
                            //           (value) => value !== item.id
                            //         )
                            //       );
                            // }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
