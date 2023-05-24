import { QueueWorker as queueService } from '@rocket.chat/core-services';

import type { AbstractMatrixEvent } from '../matrix/definitions/AbstractMatrixEvent';

export class PersistentQueue {
	private instance: any;

	public setHandler(handler: (event: AbstractMatrixEvent) => Promise<void>, concurrency: number): void {
		this.instance = fastq.promise(handler, concurrency);
	}

	public addToQueue(task: Record<string, any>): void {
		if (!this.instance) {
			throw new Error('You need to set the handler first');
		}
		this.instance.push(task).catch(console.error);
	}
}
