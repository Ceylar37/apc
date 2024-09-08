'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSpins } from '@/entities/spin';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronsUpDown } from 'lucide-react';

const { format } = new Intl.DateTimeFormat('ru-RU');

export default function History() {
  const { data: spins } = useSpins();

  return (
    <div className='space-y-2'>
      {spins?.map((spin) => (
        <Card key={spin.id}>
          <CardHeader>{format(new Date(spin.date))}</CardHeader>
          <CardContent>
            <Collapsible>
              <CollapsibleTrigger className='flex items-center gap-2 text-start'>
                Result: {spin.result}
                <Button variant='ghost'>
                  <ChevronsUpDown className='h-4 w-4' />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul>
                  {spin.selections.map((selection) => (
                    <li key={selection.id}>
                      {selection.user.name}: {selection.books.join(', ')}
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
