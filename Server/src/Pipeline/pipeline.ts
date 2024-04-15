import { EventEmitter } from 'events';
import { IQueue } from '../queues-providers/IQueue';

type FilterFunction<T> = (input: T) => T;

export class Pipeline<T> extends EventEmitter {
    private filters: FilterFunction<T>[];
    private filterQueues: { filter: FilterFunction<T>, queue: IQueue<T> }[];

    constructor(filters: FilterFunction<T>[], queueFactory: (name: string) => IQueue<T>) {
        super();
        this.filters = filters; 
        this.filterQueues = []; 
        this.setupQueues(queueFactory); 
    }

    private setupQueues(queueFactory: (name: string) => IQueue<T>): void {
        this.filters.forEach((filter, index) => {
            const queueName = `filter-queue-${index}`;
            const filterQueue = queueFactory(queueName);
            this.filterQueues.push({ filter, queue: filterQueue });
            filterQueue.process(async (data: T) => {
                try {
                    const filteredData = filter(data);
                    this.enqueueNextFilter(index, filteredData);
                } catch (err) {
                    this.emit('errorInFilter', err, data);
                }
            });
        });
    }

    private enqueueNextFilter(currentFilterIndex: number, data: T): void {
        const nextFilter = this.filterQueues[currentFilterIndex + 1];
        if (nextFilter) {
            nextFilter.queue.add( data ); 
        } else {
            this.emit('finalOutput', data);
        }
    }

    public async processInput(input: T): Promise<void> {
        if (this.filterQueues.length > 0) {
            await this.filterQueues[0].queue.add(input);
        }
    }
}
