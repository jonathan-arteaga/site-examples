'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  scheduleTourFormSchema,
  type ScheduleTourFormInput,
  getLocalDateInputValue,
} from '@hearthmere/utils/client';
import { Button } from './Button';
import { Input } from './Input';
import { Select, type SelectOption } from './Select';
import { Textarea } from './Textarea';
import { Spinner } from './Spinner';
import { FormSuccess } from './FormSuccess';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './Form';
import { useToast } from '../contexts/ToastContext';

export interface PropertyScheduleTourFormProps {
  floorPlanOptions: SelectOption[];
  defaultFloorPlan?: string;
  phonePlaceholder?: string;
  formDisclosure?: string;
}

export function PropertyScheduleTourForm({
  floorPlanOptions,
  defaultFloorPlan,
  phonePlaceholder = '(555) 123-4567',
  formDisclosure,
}: PropertyScheduleTourFormProps) {
  const searchParams = useSearchParams();
  const requestedPlan = searchParams.get('plan');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { addToast } = useToast();

  const form = useForm<ScheduleTourFormInput>({
    resolver: zodResolver(scheduleTourFormSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: undefined,
      floorPlanInterest: defaultFloorPlan || '',
      moveInDate: '',
      message: '',
    },
  });

  const { setValue } = form;
  useEffect(() => {
    const plan = requestedPlan || defaultFloorPlan || '';
    setValue('floorPlanInterest', floorPlanOptions.some(option => option.value === plan) ? plan : '');
  }, [requestedPlan, defaultFloorPlan, floorPlanOptions, setValue]);

  const onSubmit = async () => {
    setStatus('submitting');
    await new Promise<void>((resolve) => window.setTimeout(resolve, 600));
    form.reset();
    setStatus('success');
    addToast('Demo complete. Your tour request was not sent or saved.', 'success');
  };

  const today = getLocalDateInputValue();

  if (status === 'success') {
    return (
      <FormSuccess
        title="Demo Complete"
        message="This portfolio form is a browser-only simulation. Your tour request was not sent or saved."
        onReset={() => setStatus('idle')}
      />
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 relative"
        aria-label="Tour request demo form"
      >
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {status === 'submitting' && 'Simulating a local tour request...'}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-destructive" aria-hidden="true">*</span>
                </FormLabel>
                <FormControl>
                  <Input autoComplete="given-name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name <span className="text-destructive" aria-hidden="true">*</span>
                </FormLabel>
                <FormControl>
                  <Input autoComplete="family-name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-destructive" aria-hidden="true">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" inputMode="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone <span className="text-destructive" aria-hidden="true">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder={phonePlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Preferred Date <span className="text-destructive" aria-hidden="true">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" min={today} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferredTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Preferred Time <span className="text-destructive" aria-hidden="true">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    options={[
                      { value: '', label: 'Select a time' },
                      { value: 'morning', label: 'Demo morning (9:00 AM–noon)' },
                      { value: 'afternoon', label: 'Demo afternoon (noon–5:00 PM)' },
                      { value: 'evening', label: 'Demo evening (5:00–7:00 PM)' },
                    ]}
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="floorPlanInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo Plan Interest</FormLabel>
                <FormControl>
                  <Select
                    options={[{ value: '', label: 'Choose a fictional plan (optional)' }, ...floorPlanOptions]}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="moveInDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Illustrative Move-in Date</FormLabel>
                <FormControl>
                  <Input type="date" min={today} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Optional fictional notes for the form preview." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {formDisclosure && <p className="text-xs text-muted-foreground">{formDisclosure}</p>}

        <p className="text-xs text-muted-foreground">
          Portfolio demo: validation runs in your browser, and entered values are discarded.
        </p>

        <Button type="submit" className="w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Simulating...
            </>
          ) : (
            'Run Tour Demo'
          )}
        </Button>
      </form>
    </Form>
  );
}
