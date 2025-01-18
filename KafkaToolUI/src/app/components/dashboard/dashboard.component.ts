import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface KafkaClusters {
  name: string;
  bootstrapServer: string;
  srUrl: string;
}

const KC_DATA: KafkaClusters[] = [
  { name: 'test 1', bootstrapServer: 'kafkaTest:9090', srUrl: 'schm-reg:8080' },
  { name: 'test 2', bootstrapServer: 'kafkaTest:9091', srUrl: 'schm-reg:8081' },
  { name: 'test 3', bootstrapServer: 'kafkaTest:9092', srUrl: 'schm-reg:8082' },
  { name: 'test 4', bootstrapServer: 'kafkaTest:9093', srUrl: 'schm-reg:8083' },
  { name: 'test 5', bootstrapServer: 'kafkaTest:9094', srUrl: 'schm-reg:8084' },
  { name: 'test 6', bootstrapServer: 'kafkaTest:9095', srUrl: 'schm-reg:8085' },
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  displayedColumns: string[] = ['name', 'bootstrapServer', 'srUrl'];
  dataSource = new MatTableDataSource<KafkaClusters>(KC_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
