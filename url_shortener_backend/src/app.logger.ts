import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class AppLogger extends ConsoleLogger {
  private appName: string;

  public setAppName(name: string): void {
    this.appName = name;
  }

  protected formatPid(pid: number): string {
    return `[${this.appName}] ${pid} -`;
  }
}
